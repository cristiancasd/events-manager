import {
  NotFoundError,
  errorHandlerTypeOrm,
  codeCommerceNotFound,
  errorMessageTicketNotFound,
  codeTicketNotFound,
  errorMessageCommerceNotFound,
  DataBaseError,
  errorMsgDb,
  duplicatedNameMessage,
  codeDbNameDuplicated
} from '../../../../core';
import { connectDB } from '../../../../database';
import { CommerceUseCase } from '../../../commerce';
import { LevelUseCase } from '../../../levels';
import {
  TicketProspectFeeEntity,
  TicketProspectFeeRepository,
  TicketProspectFeeValue
} from '../../domain';
import { TicketProspectFeeTypeORMEntity } from '../models/ticketProspectFee.dto';

export class TicketProspectFeeRepositoryImpl
  implements TicketProspectFeeRepository
{
  constructor(
    private commerceUseCase: CommerceUseCase,
  ) {}

  @errorHandlerTypeOrm
  async createTicket(
    data: TicketProspectFeeEntity
  ): Promise<TicketProspectFeeEntity> {
    const ticketRepository = connectDB.getRepository(
      TicketProspectFeeTypeORMEntity
    );

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const { id, ...resto } = data;

    const newTicket = ticketRepository.create(resto);

    const ticketSaved = await ticketRepository.save({
      ...newTicket,
      commerce: commerce
    });

    return new TicketProspectFeeValue({
      ...ticketSaved,
      commerceUid: commerce.id
    });
  }

  @errorHandlerTypeOrm
  async editTicket(
    data: TicketProspectFeeEntity
  ): Promise<TicketProspectFeeEntity> {
    const ticketRepository = connectDB.getRepository(
      TicketProspectFeeTypeORMEntity
    );
    const ticketFound = await ticketRepository.findOneBy({ id: data.id });

    if (!ticketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    if (ticketFound.name != data.name) {
      throw new DataBaseError(duplicatedNameMessage, codeDbNameDuplicated);
    }

    const ticketSaved = await ticketRepository.save({
      ...ticketFound,
      ...data
    });
    if (!ticketSaved) throw new DataBaseError(errorMsgDb);

    return new TicketProspectFeeValue({
      ...ticketSaved,
      commerceUid: ticketSaved.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async findTicketByName(
    commerceUid: string,
    name: string
  ): Promise<TicketProspectFeeEntity> {
    const ticketRepository = connectDB.getRepository(
      TicketProspectFeeTypeORMEntity
    );
    const queryBuilder = ticketRepository
      .createQueryBuilder('ticketProspectFee')
      .leftJoinAndSelect('ticketProspectFee.commerce', 'commerce')
      .where('LOWER(ticketProspectFee.name) = LOWER(:name)', { name })
      .andWhere('commerce.id = :commerceUid', { commerceUid });

    const ticketFound = await queryBuilder.getOne();
    if (!ticketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new TicketProspectFeeValue({
      ...ticketFound,
      commerceUid: ticketFound.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async getTicketsByCommerce(
    commerceUid: string
  ): Promise<TicketProspectFeeEntity[]> {
    const ticketRepository = connectDB.getRepository(
      TicketProspectFeeTypeORMEntity
    );

    const queryBuilder = ticketRepository
      .createQueryBuilder('ticketProspectFee')
      .leftJoinAndSelect('ticketProspectFee.commerce', 'commerce')
      .where('commerce.id = :commerceUid', { commerceUid });

    const tickets = await queryBuilder.getMany();
    return tickets.map(
      (data) =>
        new TicketProspectFeeValue({
          ...data,
          commerceUid: data.commerce.id
        })
    );
  }

  @errorHandlerTypeOrm
  async deleteTicket(uid: string): Promise<void> {
    const ticketRepository = connectDB.getRepository(
      TicketProspectFeeTypeORMEntity
    );
    const ticketToDelete = await ticketRepository.findOneBy({ id: uid });
    if (ticketToDelete) {
      const deleteResponse = await ticketRepository.remove(ticketToDelete);
      return;
    }
    throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);
  }
}
