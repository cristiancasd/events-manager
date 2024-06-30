import {
  BadRequestError,
  NotFoundError,
  codeAttendeeNotFound,
  codeCommerceNotFound,
  errorHandlerTypeOrm,
  errorMessageAttendeeNotFound,
  errorMessageCommerceNotFound
} from '../../../../core';
import { connectDB } from '../../../../database';
import { EventsUseCase } from '../../../events';
import { UserUseCase } from '../../../user';
import {
  AttendeeUserValue,
  AttendeeUserBasicDataValue,
  AttendeeUserEntity,
  AttendeeUserRepository
} from '../../domain';
import { AttendeeUserTypeORMEntity } from '../models/attendeeUser.dto';

export class AttendeeUserRepositoryImpl implements AttendeeUserRepository {
  constructor(
    private readonly eventUseCase: EventsUseCase,
    private readonly userCommerceUseCase: UserUseCase
  ) {}

  @errorHandlerTypeOrm
  async registerAttendeeUser(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity> {
    const attendeeUserRepository = connectDB.getRepository(
      AttendeeUserTypeORMEntity
    );

    const userCommerce = await this.userCommerceUseCase.findUserByUid(
      userCommerceUid
    );

    const event = await this.eventUseCase.findEventByUid(eventUid);

    if (userCommerce.commerceUid != event.commerceUid)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    // Create attendee DB
    const attendeeUser = attendeeUserRepository.create({
      userCommerce,
      event
    });

    // Save on DB
    const attendeeUserSaved: AttendeeUserTypeORMEntity =
      await attendeeUserRepository.save({
        ...attendeeUser
      });

    return new AttendeeUserValue({
      id: attendeeUserSaved.id,
      eventUid: attendeeUser.event.id,
      userData: new AttendeeUserBasicDataValue({
        id: attendeeUserSaved.userCommerce.id,
        name: userCommerce.name,
        phone: userCommerce.phone,
        levelUid: attendeeUserSaved.event.id,
        commerceUserId: userCommerce.commerceUserId
      })
    });
  }

  @errorHandlerTypeOrm
  async findAttendeeByUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity> {
    const attendeeUserRepository = connectDB.getRepository(
      AttendeeUserTypeORMEntity
    );

    const queryBuilder = attendeeUserRepository
      .createQueryBuilder('attendeeUser')
      .leftJoinAndSelect('attendeeUser.event', 'event')
      .leftJoinAndSelect('attendeeUser.userCommerce', 'userCommerce')
      .where('userCommerce.id = :userCommerceUid', {
        userCommerceUid
      })
      .andWhere('event.id = :eventUid', {
        eventUid
      });
    const attendeeUser = await queryBuilder.getOne();

    if (!attendeeUser)
      throw new NotFoundError(
        errorMessageAttendeeNotFound,
        codeAttendeeNotFound
      );

    const userCommerce = await this.userCommerceUseCase.findUserByUid(
      userCommerceUid
    );

    return new AttendeeUserValue({
      id: attendeeUser.id,
      eventUid: attendeeUser.event.id,
      userData: new AttendeeUserBasicDataValue({
        id: attendeeUser.userCommerce.id,
        name: userCommerce.name,
        phone: userCommerce.phone,
        levelUid: attendeeUser.event.id,
        commerceUserId: userCommerce.commerceUserId
      })
    });
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEvent(
    eventUid: string
  ): Promise<AttendeeUserEntity[]> {
    const attendeeUserRepository = connectDB.getRepository(
      AttendeeUserTypeORMEntity
    );

    const queryBuilder = attendeeUserRepository
      .createQueryBuilder('attendeeUser')
      .leftJoinAndSelect('attendeeUser.event', 'event')
      .leftJoinAndSelect('attendeeUser.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .leftJoinAndSelect('userCommerce.level', 'level')

      .where('event.id = :eventUid', {
        eventUid
      });
    const attendeesUser = await queryBuilder.getMany();

    const attendeeUserArray: AttendeeUserEntity[] = [];

    attendeesUser.forEach((attendeesUser) => {
      const attendeesUserEntity = new AttendeeUserValue({
        id: attendeesUser.id,
        eventUid: attendeesUser.event.id,
        userData: new AttendeeUserBasicDataValue({
          id: attendeesUser.userCommerce.id,
          name: attendeesUser.userCommerce.user.name,
          phone: attendeesUser.userCommerce.user.phone,
          levelUid: attendeesUser.userCommerce.level.id,
          commerceUserId: attendeesUser.userCommerce.commerceUserId
        })
      });
      attendeeUserArray.push(attendeesUserEntity);
    });
    return attendeeUserArray;
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string
  ): Promise<AttendeeUserEntity[]> {
    const attendeeUserRepository = connectDB.getRepository(
      AttendeeUserTypeORMEntity
    );

    const queryBuilder = attendeeUserRepository
      .createQueryBuilder('attendeeUser')
      .leftJoinAndSelect('attendeeUser.event', 'event')
      .leftJoinAndSelect('attendeeUser.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .leftJoinAndSelect('userCommerce.level', 'level')

      .where('event.id = :eventUid', { eventUid })
      .andWhere('level.id = :levelUid', { levelUid });

    const attendeesUser = await queryBuilder.getMany();

    const attendeeUserArray: AttendeeUserEntity[] = [];
    attendeesUser.forEach((attendeeUser) => {
      if (attendeeUser.userCommerce.level.id == levelUid) {
        const attendeesUserEntity = new AttendeeUserValue({
          id: attendeeUser.id,
          eventUid: attendeeUser.event.id,
          userData: new AttendeeUserBasicDataValue({
            id: attendeeUser.userCommerce.id,
            name: attendeeUser.userCommerce.user.name,
            phone: attendeeUser.userCommerce.user.phone,
            levelUid: attendeeUser.userCommerce.level.id,
            commerceUserId: attendeeUser.userCommerce.commerceUserId
          })
        });
        attendeeUserArray.push(attendeesUserEntity);
      }
    });
    return attendeeUserArray;
  }
}
