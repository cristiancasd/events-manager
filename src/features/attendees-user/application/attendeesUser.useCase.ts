import { NotFoundError, errorHandlerUseCase } from '../../../core';
import {
  AttendeeUserEntity,
  AttendeeUserRepository,
  AttendeesUserUseCaseInterface
} from '../domain';

export class AttendeesUserUseCase implements AttendeesUserUseCaseInterface {
  constructor(
    private readonly _attendeesUserRepository: AttendeeUserRepository
  ) {}

  @errorHandlerUseCase
  async registerAttendeeUser(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity> {
    return await this._attendeesUserRepository.registerAttendeeUser(
      eventUid,
      userCommerceUid
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
