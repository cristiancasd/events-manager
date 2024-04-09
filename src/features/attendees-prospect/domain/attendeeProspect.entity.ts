import { AttendeeProspectBasicDataEntity } from "./attendeeProspectBasicData.entity";

export interface AttendeeProspectEntity {
  id: string;
  eventUid: string;
  prospectData: AttendeeProspectBasicDataEntity;
}
