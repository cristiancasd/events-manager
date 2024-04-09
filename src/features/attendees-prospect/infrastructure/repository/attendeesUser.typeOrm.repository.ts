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
import { ProspectEntity, ProspectsUseCase } from '../../../prospects';
import { AttendeeProspectBasicDataValue, AttendeeProspectEntity, AttendeeProspectRepository, AttendeeProspectValue } from '../../domain';
import { AttendeeProspectTypeORMEntity } from '../models/attendeeProspect.dto';


export class AttendeeProspectRepositoryImpl implements AttendeeProspectRepository {
  constructor(
    private readonly eventUseCase: EventsUseCase,
    private readonly prospectUseCase: ProspectsUseCase
  ) {}

  @errorHandlerTypeOrm
  async registerAttendeeProspect(
    eventUid: string,
    prospectUid: string,
    userCommerceUid: string,
  ): Promise<AttendeeProspectEntity> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const prospect: ProspectEntity = await this.prospectUseCase.findProspectByUid(
      prospectUid
    );

    const event = await this.eventUseCase.findEventByUid(eventUid);

    if (prospect.commerceUid != event.commerceUid)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    // Create attendee DB
    const attendeeProspect = attendeeProspectRepository.create({
      prospect,
      event
    });

    // Save on DB
    const attendeeProspectSaved: AttendeeProspectTypeORMEntity =
      await attendeeProspectRepository.save({
        ...attendeeProspect
      });

    return new AttendeeProspectValue({
      id: attendeeProspectSaved.id,
      eventUid: attendeeProspect.event.id,
      prospectData: new AttendeeProspectBasicDataValue({
        id: attendeeProspectSaved.prospect.id,
        name: prospect.name,
        phone: prospect.phone,
        prospectUid: attendeeProspectSaved.prospect.id,
        userCommerceUid: attendeeProspectSaved.prospect.userCommerce.id,
      })
    });
  }

  @errorHandlerTypeOrm
  async findAttendeeByProspectUid(
    eventUid: string,
    prospectUid: string
  ): Promise<AttendeeProspectEntity> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const queryBuilder = attendeeProspectRepository
      .createQueryBuilder('attendeeProspect')
      .leftJoinAndSelect('attendeeProspect.event', 'event')
      .leftJoinAndSelect('attendeeProspect.prospect', 'prospect')
      .where('prospect.id = :prospectUid', {
        prospectUid
      })
      .andWhere('event.id = :eventUid', {
        eventUid
      });
    const attendeeProspect = await queryBuilder.getOne();

    if (!attendeeProspect)
      throw new NotFoundError(
        errorMessageAttendeeNotFound,
        codeAttendeeNotFound
      );

      const prospect: ProspectEntity = await this.prospectUseCase.findProspectByUid(
        prospectUid
      );

    return new AttendeeProspectValue({
      id: attendeeProspect.id,
      eventUid: attendeeProspect.event.id,
      prospectData: new AttendeeProspectBasicDataValue({
        id: attendeeProspect.prospect.id,
        name: prospect.name,
        phone: prospect.phone,
        prospectUid: attendeeProspect.prospect.id,
        userCommerceUid: attendeeProspect.prospect.id
      })
    });
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEvent(
    eventUid: string
  ): Promise<AttendeeProspectEntity[]> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const queryBuilder = attendeeProspectRepository
      .createQueryBuilder('attendeeProspect')
      .leftJoinAndSelect('attendeeProspect.event', 'event')
      .leftJoinAndSelect('attendeeProspect.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .leftJoinAndSelect('userCommerce.level', 'level')

      .where('event.id = :eventUid', {
        eventUid
      });
    const attendeesUser = await queryBuilder.getMany();

    
    
    const attendeeProspectArray: AttendeeProspectEntity[] = [];

    attendeesUser.forEach((attendeesUser) => {

    

      const attendeesUserEntity = new AttendeeProspectValue({
        id: attendeesUser.id,
        eventUid: attendeesUser.event.id,
        userData: new AttendeeProspectBasicDataValue({
          id: attendeesUser.userCommerce.id,
          name: attendeesUser.userCommerce.user.name,
          phone: attendeesUser.userCommerce.user.phone,
          commerceUserId: attendeesUser.userCommerce.id,
          levelUid: attendeesUser.userCommerce.level.id
        })
      });
      attendeeProspectArray.push(attendeesUserEntity);

     
    });
    return attendeeProspectArray;
  }

  @errorHandlerTypeOrm
  async getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string
  ): Promise<AttendeeProspectEntity[]> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const queryBuilder = attendeeProspectRepository
      .createQueryBuilder('attendeeProspect')
      .leftJoinAndSelect('attendeeProspect.event', 'event')
      .leftJoinAndSelect('attendeeProspect.userCommerce', 'userCommerce')
      .leftJoinAndSelect('userCommerce.user', 'user')
      .leftJoinAndSelect('userCommerce.level', 'level')

      .where('event.id = :eventUid', { eventUid })
      .andWhere('level.id = :levelUid', { levelUid });

    

    const attendeesUser = await queryBuilder.getMany();

    const attendeeProspectArray: AttendeeProspectEntity[] = [];
    attendeesUser.forEach((attendeeProspect) => {
      if (attendeeProspect.userCommerce.level.id == levelUid) {
        const attendeesUserEntity = new AttendeeProspectValue({
          id: attendeeProspect.id,
          eventUid: attendeeProspect.event.id,
          userData: new AttendeeProspectBasicDataValue({
            id: attendeeProspect.userCommerce.id,
            name: attendeeProspect.userCommerce.user.name,
            phone: attendeeProspect.userCommerce.user.phone,
            commerceUserId: attendeeProspect.userCommerce.id,
            levelUid: attendeeProspect.userCommerce.level.id
          })
        });
        attendeeProspectArray.push(attendeesUserEntity);
      }
    });
    return attendeeProspectArray;
  }
}
