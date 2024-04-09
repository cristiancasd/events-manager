import { AttendeeProspectEntity } from "./attendeeProspect.entity";

export interface AttendeesUserUseCaseInterface {
  registerAttendeeProspect(
    eventUid: string,
    prospectUid: string,
    userCommerceUid: string,
  ): Promise<AttendeeProspectEntity>;
  getAttendeesProspectByEvent(eventUid: string): Promise<AttendeeProspectEntity[]>;
  getAttendeesProspectByEventAndUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeProspectEntity[]>;
}
