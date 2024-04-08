import { AttendeeUserEntity } from "./attendeeUser.entity";

export interface AttendeeUserRepository {
  registerAttendeeUser(data: AttendeeUserEntity): Promise<AttendeeUserEntity>;
  getAttendeesUserByEvent(eventUid: string): Promise<AttendeeUserEntity[]>;
  getAttendeesUserByEventAndLevelUid(eventUid: string, levelUid: string): Promise<AttendeeUserEntity[]>;
}

