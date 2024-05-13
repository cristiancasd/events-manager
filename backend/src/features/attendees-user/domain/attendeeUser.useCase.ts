import { AttendeeUserEntity } from './attendeeUser.entity';

export interface AttendeesUserUseCaseInterface {
  registerAttendeeUser(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeUserEntity>;
  getAttendeesUserByEvent(eventUid: string): Promise<AttendeeUserEntity[]>;
  getAttendeesUserByEventAndLevelUid(
    eventUid: string,
    levelUid: string
  ): Promise<AttendeeUserEntity[]>;
}
