import { v4 as uuid } from 'uuid';
import { AttendeeProspectEntity } from './attendeeProspect.entity';
import { AttendeeProspectBasicDataEntity } from './attendeeProspectBasicData.entity';


export class AttendeeProspectValue implements AttendeeProspectEntity {
  id: string;
  eventUid: string;
  prospectData: AttendeeProspectBasicDataEntity;

  constructor({
    id,
    eventUid,
    prospectData
  }: {
    id?: string | undefined;
    eventUid: string;
    prospectData: AttendeeProspectBasicDataEntity;
  }) {
    this.id = id ?? uuid();
    this.eventUid = eventUid;
    this.prospectData = prospectData;
  }
}
