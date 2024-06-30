import {
  BadRequestError,
  CustomError,
  NotFoundError,
  attendeeAlreadyRegisteredMessage,
  codeAttendeeNotFound,
  codeDbAttendeeAlreadyExist,
  codeTicketNotFound,
  errorHandlerUseCase
} from '../../../core';
import { UserTicketUseCaseInterface } from '../../user-ticket';
import {
  AttendeeUserEntity,
  AttendeeUserRepository,
  AttendeesUserUseCaseInterface
} from '../domain';

export class AttendeesUserUseCase implements AttendeesUserUseCaseInterface {
  constructor(
    private readonly _attendeesUserRepository: AttendeeUserRepository,
    private readonly _userTicketUseCase: UserTicketUseCaseInterface
  ) {}

  @errorHandlerUseCase
  async registerAttendeeUser(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity> {
    try {
      await this._userTicketUseCase.findUserTicketByUserAndEvent(
        userCommerceUid,
        eventUid
      );
      await this._attendeesUserRepository.findAttendeeByUserCommerceUid(
        eventUid,
        userCommerceUid
      );
    } catch (err) {
      if (err instanceof NotFoundError) {
        if (err.code === codeTicketNotFound) {
          throw err;
        }
        if (err.code === codeAttendeeNotFound) {
          return await this._attendeesUserRepository.registerAttendeeUser(
            eventUid,
            userCommerceUid
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
  async getAttendeesUserByEvent(
    eventUid: string
  ): Promise<AttendeeUserEntity[]> {
    return await this._attendeesUserRepository.getAttendeesUserByEvent(
      eventUid
    );
  }

  @errorHandlerUseCase
  async getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string
  ): Promise<AttendeeUserEntity[]> {
    return await this._attendeesUserRepository.getAttendeesUserByEventAndLevelUid(
      eventUid,
      levelUid
    );
  }
}
