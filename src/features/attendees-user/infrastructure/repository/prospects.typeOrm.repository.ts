import {
  BadRequestError,
  codeCommerceNotFound,
  errorHandlerTypeOrm,
  errorMessageCommerceNotFound,
} from '../../../../core';
import { connectDB } from '../../../../database';
import { EventsUseCase } from '../../../events';
import { UserUseCase } from '../../../user';
import { AttendeeUserValue, AttendeeUserBasicDataValue, AttendeeUserEntity, AttendeeUserRepository } from '../../domain';
import { AttendeeUserTypeORMEntity } from '../models/attendeeUser.dto';


export class AttendeeUsersTypeORMRepository implements AttendeeUserRepository {
  constructor(
    private eventUseCase: EventsUseCase,
    private userCommerceUseCase: UserUseCase
  ) {}

  @errorHandlerTypeOrm
  async registerAttendeeUser(data: AttendeeUserEntity): Promise<AttendeeUserEntity> {
    const attendeeUserRepository = connectDB.getRepository(AttendeeUserTypeORMEntity);

    const userCommerce = await this.userCommerceUseCase.findUserByUid(
      data.userData.id
    );

    const event = await this.eventUseCase.findEventByUid(
      data.eventUid
    );

    if (userCommerce.commerceUid != event.commerceUid)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    // Create attendee DB
    const attendeeUser = attendeeUserRepository.create({
      ...data,
      userCommerce, 
      event,
    });

    // Save on DB
    const attendeeUserSaved: AttendeeUserTypeORMEntity = await attendeeUserRepository.save({
      ...attendeeUser,
      userCommerce,
      event,
    });

    return new AttendeeUserValue({
      id: attendeeUserSaved.id,
      eventUid: attendeeUser.event.id,
      userData: new AttendeeUserBasicDataValue({
        id: attendeeUserSaved.userCommerce.id,
        name: attendeeUserSaved.userCommerce.user.name,
        phone: attendeeUserSaved.userCommerce.user.phone,
        commerceUserId: attendeeUserSaved.userCommerce.id,
        levelUid: attendeeUserSaved.event.id,
      })
    });
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEvent(
    eventUid: string,
  ): Promise<AttendeeUserEntity[]> {
    const attendeeUserRepository = connectDB.getRepository(AttendeeUserTypeORMEntity);

    const queryBuilder = attendeeUserRepository
      .createQueryBuilder('attendeeUser')
      .leftJoinAndSelect('attendeeUser.event', 'event')
      .leftJoinAndSelect('attendeeUser.userCommerce', 'userCommerce')
      .where('attendeeUser.event.id = :eventUid', {
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
            commerceUserId: attendeesUser.userCommerce.id,
            levelUid: attendeesUser.event.id,
      })
        });
        attendeeUserArray.push(attendeesUserEntity);
      });
      return attendeeUserArray;
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string,
  ): Promise<AttendeeUserEntity[]> {
    const attendeeUserRepository = connectDB.getRepository(AttendeeUserTypeORMEntity);

    const queryBuilder = attendeeUserRepository
        .createQueryBuilder('attendeeUser')
        .leftJoinAndSelect('attendeeUser.event', 'event')
        .leftJoinAndSelect('attendeeUser.userCommerce', 'userCommerce')
        .where('attendeeUser.event.id = :eventUid', { eventUid })
        .andWhere('userCommerce.level.id = :levelUid', { levelUid });

        
      const attendeesUser = await queryBuilder.getMany();

      const attendeeUserArray: AttendeeUserEntity[] = [];
      attendeesUser.forEach((attendeeUser) => {

        if(attendeeUser.userCommerce.level.id==levelUid){
          const attendeesUserEntity = new AttendeeUserValue({
            id: attendeeUser.id,
            eventUid: attendeeUser.event.id,
            userData: new AttendeeUserBasicDataValue({
              id: attendeeUser.userCommerce.id,
              name: attendeeUser.userCommerce.user.name,
              phone: attendeeUser.userCommerce.user.phone,
              commerceUserId: attendeeUser.userCommerce.id,
              levelUid: attendeeUser.event.id,
        })
          });
          attendeeUserArray.push(attendeesUserEntity);
        }

      });
      return attendeeUserArray;
  }
}
