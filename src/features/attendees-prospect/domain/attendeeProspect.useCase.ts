import { AttendeeProspectEntity } from './attendeeProspect.entity';

export interface AttendeesProspectUseCaseInterface {
  registerAttendeeProspect(
    eventUid: string,
    prospectUid: string
  ): Promise<AttendeeProspectEntity>;
  getAttendeesProspectByEvent(
    eventUid: string
  ): Promise<AttendeeProspectEntity[]>;
  getAttendeesProspectByEventAndUserCommerceUid(
    eventUid: string,
    userCommerceUid: string
  ): Promise<AttendeeProspectEntity[]>;
}
