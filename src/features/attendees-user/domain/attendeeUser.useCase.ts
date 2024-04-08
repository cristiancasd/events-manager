import { AttendeeUserEntity } from "./attendeeUser.entity";

export interface AttendeesUserUseCaseInterface {
  registerAttendee(data: AttendeeUserEntity): Promise<AttendeeUserEntity>;
  getAttendeeByEvent(eventUid: string): Promise<AttendeeUserEntity[]>;
  getAttendeeByEventAndLevelUid(eventUid: string, levelUid: string): Promise<AttendeeUserEntity[]>;
}
