import { v4 as uuid } from 'uuid';
import { AttendeeUserBasicDataEntity } from './attendeeUserBasicData.entity';

export class AttendeeUserBasicDataValue implements AttendeeUserBasicDataEntity {
  id: string;
  name: string;
  phone: string;
  levelUid: string;
  commerceUserId: string;

  constructor({
    id,
    name,
    levelUid,
    phone,
    commerceUserId
  }: {
    id: string;
    name: string;
    levelUid: string;
    phone: string;
    commerceUserId: string;
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.levelUid = levelUid;
    this.commerceUserId = commerceUserId;
  }
}
