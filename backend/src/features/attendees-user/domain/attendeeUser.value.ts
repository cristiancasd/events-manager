import { v4 as uuid } from 'uuid';
import { AttendeeUserBasicDataEntity } from './attendeeUserBasicData.entity';
import { AttendeeUserEntity } from './attendeeUser.entity';

export class AttendeeUserValue implements AttendeeUserEntity {
  id: string;
  eventUid: string;
  userData: AttendeeUserBasicDataEntity;

  constructor({
    id,
    eventUid,
    userData
  }: {
    id?: string | undefined;
    eventUid: string;
    userData: AttendeeUserBasicDataEntity;
  }) {
    this.id = id ?? uuid();
    this.eventUid = eventUid;
    this.userData = userData;
  }
}
