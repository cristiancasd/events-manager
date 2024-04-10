import { v4 as uuid } from 'uuid';
import { AttendeeProspectBasicDataEntity } from './attendeeProspectBasicData.entity';

export class AttendeeProspectBasicDataValue
  implements AttendeeProspectBasicDataEntity
{
  id: string;
  name: string;
  phone: string;
  userCommerceUid: string;

  constructor({
    id,
    name,
    phone,
    userCommerceUid
  }: {
    id: string;
    name: string;
    phone: string;
    userCommerceUid: string;
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.userCommerceUid = userCommerceUid;
  }
}
