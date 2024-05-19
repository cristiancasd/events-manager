import { v4 as uuid } from 'uuid';
import { CommerceUserRoles } from '../../../core/shared/constants';
import { UserCoreEntity } from './userCore.entity';

export class UserCoreValue implements UserCoreEntity {
  id: string;
  phone: string;
  name: string;
  email: string;
  document: string;
  constructor({
    id,
    phone,
    name,
    email,
    document
  }: {
    id: string;
    phone: string;
    name: string;
    email: string;
    document: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
  }
}
