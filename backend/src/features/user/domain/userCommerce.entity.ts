import { CommerceUserRoles } from '../../../core/shared/constants';

export interface UserCommerceEntity {
  id: string;
  email: string;
  commerceUserId: string;
  role: CommerceUserRoles;
  levelUid: string;
  commerceUid: string;
  isActive: boolean;
  freeSpace?: string;
  password?: string;
}
