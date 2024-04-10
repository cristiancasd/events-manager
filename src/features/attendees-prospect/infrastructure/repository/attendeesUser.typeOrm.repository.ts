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
import {
  AttendeeProspectBasicDataValue,
  AttendeeProspectEntity,
  AttendeeProspectRepository,
  AttendeeProspectValue
} from '../../domain';
import { AttendeeProspectTypeORMEntity } from '../models/attendeeProspect.dto';

export class AttendeeProspectRepositoryImpl
  implements AttendeeProspectRepository
{
  constructor(
    private readonly eventUseCase: EventsUseCase,
    private readonly prospectUseCase: ProspectsUseCase
  ) {}

  @errorHandlerTypeOrm
  async registerAttendeeProspect(
    eventUid: string,
    prospectUid: string
  ): Promise<AttendeeProspectEntity> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const prospect: ProspectEntity =
      await this.prospectUseCase.findProspectByUid(prospectUid);

    const event = await this.eventUseCase.findEventByUid(eventUid);

    if (prospect.commerceUid != event.commerceUid)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    // Create attendee DB
    const attendeeProspect = attendeeProspectRepository.create({
      prospect: { id: prospectUid },
      event: { id: eventUid }
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
        userCommerceUid: attendeeProspectSaved.prospect.userCommerce.id
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

    return new AttendeeProspectValue({
      id: attendeeProspect.id,
      eventUid: attendeeProspect.event.id,
      prospectData: new AttendeeProspectBasicDataValue({
        id: attendeeProspect.prospect.id,
        name: attendeeProspect.prospect.name,
        phone: attendeeProspect.prospect.phone,
        userCommerceUid: attendeeProspect.prospect.id
      })
    });
  }

  @errorHandlerTypeOrm
  async getAttendeesProspectByEvent(
    eventUid: string
  ): Promise<AttendeeProspectEntity[]> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const queryBuilder = attendeeProspectRepository
      .createQueryBuilder('attendeeProspect')
      .leftJoinAndSelect('attendeeProspect.event', 'event')
      .leftJoinAndSelect('attendeeProspect.prospect', 'prospect')
      .where('event.id = :eventUid', {
        eventUid
      });
    const attendeesProspect = await queryBuilder.getMany();

    const attendeeProspectArray: AttendeeProspectEntity[] = [];

    attendeesProspect.forEach((attendeeProspect) => {
      const attendeesProspectEntity = new AttendeeProspectValue({
        id: attendeeProspect.id,
        eventUid: attendeeProspect.event.id,
        prospectData: new AttendeeProspectBasicDataValue({
          id: attendeeProspect.prospect.id,
          name: attendeeProspect.prospect.name,
          phone: attendeeProspect.prospect.phone,
          userCommerceUid: attendeeProspect.prospect.userCommerce.id
        })
      });
      attendeeProspectArray.push(attendeesProspectEntity);
    });
    return attendeeProspectArray;
  }

  @errorHandlerTypeOrm
  async getAttendeesProspectByEventAndUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeProspectEntity[]> {
    const attendeeProspectRepository = connectDB.getRepository(
      AttendeeProspectTypeORMEntity
    );

    const queryBuilder = attendeeProspectRepository
      .createQueryBuilder('attendeeProspect')
      .leftJoinAndSelect('attendeeProspect.event', 'event')
      .leftJoinAndSelect('attendeeProspect.prospect', 'prospect')
      .leftJoinAndSelect('prospect.userCommerce', 'userCommerce')
      .where('event.id = :eventUid', { eventUid })
      .andWhere('userCommerceUid.id = :userCommerceUid', { userCommerceUid });

    const attendeesProspect = await queryBuilder.getMany();

    const attendeeProspectArray: AttendeeProspectEntity[] = [];

    attendeesProspect.forEach((attendeeProspect) => {
      const attendeesProspectEntity = new AttendeeProspectValue({
        id: attendeeProspect.id,
        eventUid: attendeeProspect.event.id,
        prospectData: new AttendeeProspectBasicDataValue({
          id: attendeeProspect.prospect.id,
          name: attendeeProspect.prospect.name,
          phone: attendeeProspect.prospect.phone,
          userCommerceUid: attendeeProspect.prospect.userCommerce.id
        })
      });
      attendeeProspectArray.push(attendeesProspectEntity);
    });

    return attendeeProspectArray;
  }
}
