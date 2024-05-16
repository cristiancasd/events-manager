import {
  TicketEntity,
  TicketRepository,
  TicketTypeORMEntity,
  TicketValue
} from '../..';
import {
  NotFoundError,
  errorHandlerTypeOrm,
  codeCommerceNotFound,
  errorMessageTicketNotFound,
  codeTicketNotFound,
  errorMessageCommerceNotFound,
  DataBaseError,
  errorMsgDb
} from '../../../../core';
import { connectDB } from '../../../../database';
import { CommerceUseCase } from '../../../commerce';
import { LevelUseCase } from '../../../levels';

export class TicketRepositoryImpl implements TicketRepository {
  constructor(
    private commerceUseCase: CommerceUseCase,
    private levelUseCase: LevelUseCase
  ) {}

  @errorHandlerTypeOrm
  async createTicket(data: TicketEntity): Promise<TicketEntity> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const level = await this.levelUseCase.findLevelByUid(data.levelUid);

    if (commerce.id != level.commerceUid)
      throw new NotFoundError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    const { id, ...resto } = data;

    const newTicket = ticketRepository.create(resto);

    const ticketSaved = await ticketRepository.save({
      ...newTicket,
      level: level,
      commerce: commerce
    });

    return new TicketValue({
      ...ticketSaved,
      levelUid: level.id,
      commerceUid: commerce.id
    });
  }

  @errorHandlerTypeOrm
  async editTicket(data: TicketEntity): Promise<TicketEntity> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);
    const ticketFound = await ticketRepository.findOneBy({ id: data.id });

    if (!ticketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    const ticketSaved = await ticketRepository.save({
      ...ticketFound,
      ...data
    });
    if (!ticketSaved) throw new DataBaseError(errorMsgDb);

    return new TicketValue({
      ...ticketSaved,
      levelUid: ticketSaved.level.id,
      commerceUid: ticketSaved.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async findTicketByUid(ticketUid: string): Promise<TicketEntity> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);
    const ticketFound = await ticketRepository.findOneBy({ id: ticketUid });

    if (!ticketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new TicketValue({
      ...ticketFound,
      levelUid: ticketFound.level.id,
      commerceUid: ticketFound.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async findTicketByName(
    commerceUid: string,
    name: string
  ): Promise<TicketEntity> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);
    const queryBuilder = ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.commerce', 'commerce')
      .leftJoinAndSelect('ticket.level', 'level')
      .where('LOWER(ticket.name) = LOWER(:name)', { name })
      .andWhere('commerce.id = :commerceUid', { commerceUid });

    const ticketFound = await queryBuilder.getOne();
    if (!ticketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new TicketValue({
      ...ticketFound,
      commerceUid: ticketFound.commerce.id,
      levelUid: ticketFound.level.id
    });
  }

  @errorHandlerTypeOrm
  async getTicketsByCommerce(commerceUid: string): Promise<TicketEntity[]> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);

    const queryBuilder = ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.commerce', 'commerce')
      .leftJoinAndSelect('ticket.level', 'level')
      .where('commerce.id = :commerceUid', { commerceUid });

    const tickets = await queryBuilder.getMany();
    return tickets.map(
      (data) =>
        new TicketValue({
          ...data,
          commerceUid: data.commerce.id,
          levelUid: data.level.id
        })
    );
  }

  @errorHandlerTypeOrm
  async deleteTicket(uid: string): Promise<void> {
    const ticketRepository = connectDB.getRepository(TicketTypeORMEntity);
    const ticketToDelete = await ticketRepository.findOneBy({ id: uid });
    if (ticketToDelete) {
      const deleteResponse = await ticketRepository.remove(ticketToDelete);
      return;
    }
    throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);
  }
}
