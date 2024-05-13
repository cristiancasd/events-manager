import { ProspectType } from '../../../core/shared/constants';

export interface ProspectEntity {
  id: string;
  name: string;
  phone: string;
  type: ProspectType;
  userCommerceUid: string;
  commerceUid: string;
}
