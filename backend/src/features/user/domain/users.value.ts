import { v4 as uuid } from 'uuid';
import { UserEntity } from './users.entity';
import { CommerceUserRoles } from '../../../core/shared/constants';

export class UserValue implements UserEntity {
  id: string;
  phone: string;
  name: string;
  email: string;
  document: string;
  commerceUserId: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceUid: string;
  isActive: boolean;
  password?: string | undefined;
  freeSpace?: string | undefined;
  constructor({
    id,
    phone,
    name,
    email,
    role,
    levelUid,
    commerceUid,
    document,
    commerceUserId,
    freeSpace,
    password,
    isActive
  }: {
    id: string;
    phone: string;
    name: string;
    email: string;
    document: string;
    commerceUserId: string;
    role: CommerceUserRoles;
    levelUid: string;
    commerceUid: string;
    isActive: boolean;
    freeSpace?: string | undefined;
    password?: string | undefined;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
    this.commerceUserId = commerceUserId;
    this.role = role;
    this.levelUid = levelUid;
    this.commerceUid = commerceUid;
    this.isActive = isActive;
    this.freeSpace = freeSpace;
    this.password = password;
  }
}
