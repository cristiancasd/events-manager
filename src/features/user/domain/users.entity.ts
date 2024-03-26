import { CommerceUserRoles } from '../../../core/shared/constants';

export interface UserEntity {
  id: string;
  phone: number;
  document: number;
  commerceUserId: string;
  name: string;
  email: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceId: string;
  isActive: boolean;
  freeSpace?: string;
  password?: string;
}
