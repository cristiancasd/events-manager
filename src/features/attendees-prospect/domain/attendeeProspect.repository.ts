import { AttendeeProspectEntity } from "./attendeeProspect.entity";

export interface AttendeeProspectRepository {
  registerAttendeeProspect(
    eventUid: string,
    prospectUid: string,
    userCommerceUid: string,
  ): Promise<AttendeeProspectEntity>;
  findAttendeeByProspectUid(
    eventUid: string,
    prospectUid: string
  ): Promise<AttendeeProspectEntity>;
  getAttendeesProspectByEvent(eventUid: string): Promise<AttendeeProspectEntity[]>;
  getAttendeesProspectByEventAndUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeProspectEntity[]>;
}
