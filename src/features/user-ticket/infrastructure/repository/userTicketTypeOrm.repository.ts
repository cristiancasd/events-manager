import {
  UserTicketEntity,
  UserTicketInputEntity,
  UserTicketRepository,
  UserTicketValue,
  UserTicketTypeORMEntity
} from '../..';
import {
  NotFoundError,
  errorHandlerTypeOrm,
  codeCommerceNotFound,
  errorMessageTicketNotFound,
  codeTicketNotFound,
  errorMessageCommerceNotFound,
  DataBaseError,
  errorMsgDb,
  errorMessageUserNotFound,
  codeUserNotFound
} from '../../../../core';
import { connectDB } from '../../../../database';
import { EventsUseCase } from '../../../events';
import { LevelUseCase } from '../../../levels';
import { UserUseCase } from '../../../user';

export class UserTicketRepositoryImpl implements UserTicketRepository {
  constructor(
    private userUseCase: UserUseCase,
    private eventUseCase: EventsUseCase
  ) {}

  @errorHandlerTypeOrm
  async createUserTicket(
    data: UserTicketInputEntity
  ): Promise<UserTicketEntity> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );

    const userCommerce = await this.userUseCase.findUserByUid(
      data.userCommerceUid
    );

    const event = await this.eventUseCase.findEventByUid(data.eventUid);

    if (event.commerceUid != userCommerce.commerceUid)
      throw new NotFoundError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    const newUserTicket = userticketRepository.create({
      ...data,
      userCommerce: { id: data.userCommerceUid },
      event: { id: data.eventUid }
    });

    const userTicketSaved = await userticketRepository.save(newUserTicket);

    const userTicket = await this.findUserTicketByUid(userTicketSaved.id);

    return new UserTicketValue({
      ...userTicket
    });
  }

  @errorHandlerTypeOrm
  async editUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );
    const userTicketFound = await userticketRepository.findOneBy({
      id: data.id
    });

    if (!userTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    const ticketSaved = await userticketRepository.save({
      ...userTicketFound,
      ...data
    });
    if (!ticketSaved) throw new DataBaseError(errorMsgDb);

    return new UserTicketValue({
      ...ticketSaved,
      userName: userTicketFound.userCommerce.user.name,
      levelName: userTicketFound.userCommerce.level.name,
      eventUid: userTicketFound.event.id,
      userCommerceUid: userTicketFound.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async findUserTicketByUserAndEvent(
    userCommerceUid: string,
    eventUid: string
  ): Promise<UserTicketEntity> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );

    const queryBuilder = userticketRepository
      .createQueryBuilder('userTicket')
      .leftJoinAndSelect('userTicket.event', 'event')
      .leftJoinAndSelect('userTicket.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.commerce', 'commerce')
      .leftJoinAndSelect('userCommerce.level', 'level')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .andWhere('userCommerce.id = :userCommerceUid', { userCommerceUid })
      .andWhere('event.id = :eventUid', { eventUid });

    const userTicketFound = await queryBuilder.getOne();

    if (!userTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new UserTicketValue({
      ...userTicketFound,
      userName: userTicketFound.userCommerce.user.name,
      levelName: userTicketFound.userCommerce.level.name,
      eventUid: userTicketFound.event.id,
      userCommerceUid: userTicketFound.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async findUserTicketByUid(userTicketUid: string): Promise<UserTicketEntity> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );
    const userTicketFound = await userticketRepository.findOneBy({
      id: userTicketUid
    });

    if (!userTicketFound)
      throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);

    return new UserTicketValue({
      ...userTicketFound,
      userName: userTicketFound.userCommerce.user.name,
      levelName: userTicketFound.userCommerce.level.name,
      eventUid: userTicketFound.event.id,
      userCommerceUid: userTicketFound.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async getUsersTicketByCommerceAndLevel(
    commerceUid: string,
    levelUid: string
  ): Promise<UserTicketEntity[]> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );
    const queryBuilder = userticketRepository
      .createQueryBuilder('userTicket')
      .leftJoinAndSelect('userTicket.event', 'event')
      .leftJoinAndSelect('userTicket.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.commerce', 'commerce')
      .leftJoinAndSelect('userCommerce.level', 'level')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .andWhere('level.id = :levelUid', { levelUid })
      .andWhere('commerce.id = :commerceUid', { commerceUid });

    const usersTicketFound = await queryBuilder.getMany();
    return usersTicketFound.map(
      (data) =>
        new UserTicketValue({
          ...data,
          userName: data.userCommerce.user.name,
          levelName: data.userCommerce.level.name,
          eventUid: data.event.id,
          userCommerceUid: data.userCommerce.id
        })
    );
  }

  @errorHandlerTypeOrm
  async deleteUserTicket(uid: string): Promise<void> {
    const userticketRepository = connectDB.getRepository(
      UserTicketTypeORMEntity
    );
    const userTicketToDelete = await userticketRepository.findOneBy({
      id: uid
    });
    if (userTicketToDelete) {
      const deleteResponse = await userticketRepository.remove(
        userTicketToDelete
      );
      return;
    }
    throw new NotFoundError(errorMessageTicketNotFound, codeTicketNotFound);
  }
}
