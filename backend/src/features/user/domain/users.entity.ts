import { CommerceUserRoles } from '../../../core/shared/constants';

export interface UserEntity {
  id: string;
  phone: string;
  document: string;
  commerceUserId: string;
  name: string;
  email: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceUid: string;
  isActive: boolean;
  freeSpace?: string;
  password?: string;
}
