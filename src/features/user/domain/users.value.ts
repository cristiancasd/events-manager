import { v4 as uuid } from 'uuid';
import { UserEntity } from './users.entity';
import { CommerceUserRoles } from '../../../core/shared/constants';

export class UserValue implements UserEntity {
  id: string;
  phone: number;
  name: string;
  email: string;
  document: number;
  commerceUserId: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceId: string;
  isActive: boolean;
  password?: string | undefined;
  freeSpace?: string | undefined;
  constructor({
    phone,
    name,
    email,
    role,
    levelUid,
    commerceId,
    document,
    commerceUserId,
    freeSpace,
    password,
    isActive
  }: {
    phone: number;
    name: string;
    email: string;
    document: number;
    commerceUserId: string;
    role: CommerceUserRoles;
    levelUid: string;
    commerceId: string;
    isActive: boolean;
    freeSpace?: string | undefined;
    password?: string | undefined;
  }) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
    this.commerceUserId = commerceUserId;
    this.role = role;
    this.levelUid = levelUid;
    this.commerceId = commerceId;
    this.isActive = isActive;
    this.freeSpace = freeSpace;
    this.password = password;
  }
}
