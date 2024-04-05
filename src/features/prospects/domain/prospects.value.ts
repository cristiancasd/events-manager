import { v4 as uuid } from 'uuid';
import { ProspectType } from '../../../core/shared/constants';
import { ProspectEntity } from './prospects.entity';

export class ProspectValue implements ProspectEntity {
  
  id: string;
  name: string;
  phone: string;
  type: ProspectType;
  userCommerceUid: string;
  commerceUid: string;

  constructor({
    id,
    name,
    phone,
    type,
    userCommerceUid,
    commerceUid,
  }: {
    id?: string | undefined;
  name: string;
  phone: string;
  type: ProspectType;
  userCommerceUid: string;
  commerceUid: string;
  }) {
    this.id = id?? uuid();
    this.name = name;
    this.phone = phone;
    this.type = type;
    this.userCommerceUid = userCommerceUid;
    this.commerceUid = commerceUid;
  }
}
