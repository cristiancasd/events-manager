import { v4 as uuid } from 'uuid';
import { AttendeeProspectBasicDataEntity } from './attendeeProspectBasicData.entity';

export class AttendeeProspectBasicDataValue implements AttendeeProspectBasicDataEntity {
  id: string;
  name: string;
  phone: string;
  prospectUid: string;
  userCommerceUid: string;

  constructor({
    id,
    name,
    phone,
    prospectUid,
    userCommerceUid
  }: {
    id?: string | undefined;
    name: string;
    phone: string;
    prospectUid: string;
    userCommerceUid: string;
  }) {
    this.id = id ?? uuid();
    this.name = name;
    this.phone = phone;
    this.prospectUid = prospectUid;
    this.userCommerceUid = userCommerceUid;
  }
}