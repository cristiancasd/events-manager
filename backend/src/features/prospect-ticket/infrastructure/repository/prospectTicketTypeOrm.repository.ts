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
import { EventsUseCase } from '../../../events';
import {
  ProspectTicketEntity,
  ProspectTicketInputEntity,
  ProspectTicketRepository,
  ProspectTicketTypeORMEntity,
  ProspectTicketValue
} from '../..';
import { ProspectUseCaseInterface } from '../../../prospects';

export class ProspectTicketRepositoryImpl implements ProspectTicketRepository {
  constructor(
    private prospectUseCase: ProspectUseCaseInterface,
    private eventUseCase: EventsUseCase
  ) {}

  @errorHandlerTypeOrm
  async createProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );

    const prospect = await this.prospectUseCase.findProspectByUid(
      data.prospectUid
    );

    const event = await this.eventUseCase.findEventByUid(data.eventUid);

    if (event.commerceUid != prospect.commerceUid)
      throw new NotFoundError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    const newProspectTicket = prospectTicketRepository.create({
      ...data,
      prospect: { id: data.prospectUid },
      event: { id: data.eventUid }
    });

    const prospectTicketSaved = await prospectTicketRepository.save(
      newProspectTicket
    );

    const prospectTicket = await this.findProspectTicketByUid(
      prospectTicketSaved.id
    );

    return new ProspectTicketValue({
      ...prospectTicket
    });
  }

  @errorHandlerTypeOrm
  async editProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );
    const prospectTicketFound = await prospectTicketRepository.findOneBy({
      id: data.id
    });

    if (!prospectTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    const ticketSaved = await prospectTicketRepository.save({
      ...prospectTicketFound,
      ...data
    });
    if (!ticketSaved) throw new DataBaseError(errorMsgDb);

    return new ProspectTicketValue({
      id: ticketSaved.id,
      fee: ticketSaved.fee,
      prospectType: prospectTicketFound.prospect.type,
      prospectName: prospectTicketFound.prospect.name,
      eventUid: prospectTicketFound.event.id,
      prospectUid: prospectTicketFound.prospect.id
    });
  }

  @errorHandlerTypeOrm
  async findProspectTicketByProspectAndEvent(
    prospectUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );

    const queryBuilder = prospectTicketRepository
      .createQueryBuilder('prospectTicket')
      .leftJoinAndSelect('prospectTicket.event', 'event')
      .leftJoinAndSelect('prospectTicket.prospect', 'prospect')
      .andWhere('prospect.id = :prospectUid', { prospectUid })
      .andWhere('event.id = :eventUid', { eventUid });

    const prospectTicketFound = await queryBuilder.getOne();

    if (!prospectTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new ProspectTicketValue({
      id: prospectTicketFound.id,
      fee: prospectTicketFound.fee,
      prospectName: prospectTicketFound.prospect.name,
      prospectType: prospectTicketFound.prospect.type,
      eventUid: prospectTicketFound.event.id,
      prospectUid: prospectTicketFound.prospect.id
    });
  }

  @errorHandlerTypeOrm
  async findProspectTicketByUid(
    prospectTicketUid: string
  ): Promise<ProspectTicketEntity> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );
    const prospectTicketFound = await prospectTicketRepository.findOneBy({
      id: prospectTicketUid
    });

    if (!prospectTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new ProspectTicketValue({
      id: prospectTicketFound.id,
      fee: prospectTicketFound.fee,
      prospectName: prospectTicketFound.prospect.name,
      prospectType: prospectTicketFound.prospect.type,
      eventUid: prospectTicketFound.event.id,
      prospectUid: prospectTicketFound.prospect.id
    });
  }

  @errorHandlerTypeOrm
  async getProspectsTicketByCommerceAndEvent(
    commerceUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity[]> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );
    const queryBuilder = prospectTicketRepository
      .createQueryBuilder('prospectTicket')
      .leftJoinAndSelect('prospectTicket.event', 'event')
      .leftJoinAndSelect('event.commerce', 'commerce')
      .leftJoinAndSelect('prospectTicket.prospect', 'prospect')
      .andWhere('event.id = :eventUid', { eventUid })
      .andWhere('commerce.id = :commerceUid', { commerceUid });

    const eventsTicketFound = await queryBuilder.getMany();
    return eventsTicketFound.map(
      (data) =>
        new ProspectTicketValue({
          id: data.id,
          fee: data.fee,
          prospectName: data.prospect.name,
          prospectType: data.prospect.type,
          eventUid: data.event.id,
          prospectUid: data.prospect.id
        })
    );
  }

  @errorHandlerTypeOrm
  async deleteProspectTicket(uid: string): Promise<void> {
    const prospectTicketRepository = connectDB.getRepository(
      ProspectTicketTypeORMEntity
    );
    const prospectTicketToDelete = await prospectTicketRepository.findOneBy({
      id: uid
    });
    if (prospectTicketToDelete) {
      const deleteResponse = await prospectTicketRepository.remove(
        prospectTicketToDelete
      );
      return;
    }
    throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);
  }
}
