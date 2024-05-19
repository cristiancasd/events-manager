import { AttendeeUserEntity } from './attendeeUser.entity';

export interface AttendeeUserRepository {
  registerAttendeeUser(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity>;
  findAttendeeByUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity>;
  getAttendeesUserByEvent(eventUid: string): Promise<AttendeeUserEntity[]>;
  getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string
  ): Promise<AttendeeUserEntity[]>;
}
