import { v4 as uuid } from 'uuid';
import { AttendeeUserBasicDataEntity } from './attendeeUserBasicData.entity';

export class AttendeeUserBasicDataValue implements AttendeeUserBasicDataEntity {
  id: string;
    name: string;
    levelUid: string;
    phone: string;
    commerceUserId: string;

  constructor({
    id,
    name,
    levelUid,
    phone,
    commerceUserId, 

  }: {
    id?: string | undefined;
    name: string;
    levelUid: string;
    phone: string;
    commerceUserId: string;

  }) {
    this.id = id ?? uuid();
    this.name = name;
    this.levelUid = levelUid;
    this.phone = phone;
    this.commerceUserId = commerceUserId;

  }
}
