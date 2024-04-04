import { v4 as uuid } from 'uuid';
import { CommerceUserRoles } from '../../../core/shared/constants';
import { UserCommerceEntity } from './userCommerce.entity';

export class UserCommerceValue implements UserCommerceEntity {
  id: string;
  email: string;
  commerceUserId: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceUid: string;
  isActive: boolean;
  password?: string | undefined;
  freeSpace?: string | undefined;
  constructor({
    id,
    email,
    role,
    levelUid,
    commerceUid,
    commerceUserId,
    freeSpace,
    password,
    isActive
  }: {
    id: string;
    email: string;
    commerceUserId: string;
    role: CommerceUserRoles;
    levelUid: string;
    commerceUid: string;
    isActive: boolean;
    freeSpace?: string | undefined;
    password?: string | undefined;
  }) {
    this.id = id;
    this.email = email;
    this.commerceUserId = commerceUserId;
    this.role = role;
    this.levelUid = levelUid;
    this.commerceUid = commerceUid;
    this.isActive = isActive;
    this.freeSpace = freeSpace;
    this.password = password;
  }
}
