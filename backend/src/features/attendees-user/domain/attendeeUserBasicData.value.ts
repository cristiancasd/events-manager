import { v4 as uuid } from 'uuid';
import { AttendeeUserBasicDataEntity } from './attendeeUserBasicData.entity';

export class AttendeeUserBasicDataValue implements AttendeeUserBasicDataEntity {
  id: string;
  name: string;
  phone: string;
  levelUid: string;

  constructor({
    id,
    name,
    levelUid,
    phone
  }: {
    id: string;
    name: string;
    levelUid: string;
    phone: string;
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.levelUid = levelUid;
  }
}
