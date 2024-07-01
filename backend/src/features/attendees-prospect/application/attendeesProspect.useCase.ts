import {
  BadRequestError,
  NotFoundError,
  attendeeAlreadyRegisteredMessage,
  codeAttendeeNotFound,
  codeDbAttendeeAlreadyExist,
  codeTicketNotFound,
  errorHandlerUseCase
} from '../../../core';
import {
  AttendeeProspectEntity,
  AttendeeProspectRepository,
  AttendeesProspectUseCaseInterface
} from '../domain';

export class AttendeesProspectUseCase
  implements AttendeesProspectUseCaseInterface
{
  constructor(
    private readonly _attendeesProspectRepository: AttendeeProspectRepository
  ) {}

  @errorHandlerUseCase
  async registerAttendeeProspect(
    eventUid: string,
    prospectUid: string
  ): Promise<AttendeeProspectEntity> {
    try {
      await this._attendeesProspectRepository.findAttendeeByProspectUid(
        eventUid,
        prospectUid
      );
      await this._attendeesProspectRepository.findAttendeeByProspectUid(
        eventUid,
        prospectUid
      );
    } catch (err) {

      if (err instanceof NotFoundError) {
        if (err.code === codeTicketNotFound) {
          throw err;
        }
        if (err.code === codeAttendeeNotFound) {
          return await this._attendeesProspectRepository.registerAttendeeProspect(
            eventUid,
            prospectUid
          );
        }
      }
      throw err;
      
    }
    throw new BadRequestError(
      attendeeAlreadyRegisteredMessage,
      codeDbAttendeeAlreadyExist
    );
  }

  @errorHandlerUseCase
  async getAttendeesProspectByEvent(
    eventUid: string
  ): Promise<AttendeeProspectEntity[]> {
    return await this._attendeesProspectRepository.getAttendeesProspectByEvent(
      eventUid
    );
  }

  @errorHandlerUseCase
  async getAttendeesProspectByEventAndUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeProspectEntity[]> {
    return await this._attendeesProspectRepository.getAttendeesProspectByEventAndUserCommerceUid(
      eventUid,
      userCommerceUid
    );
  }
}
