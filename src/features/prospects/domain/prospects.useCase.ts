import { ProspectEntity } from './prospects.entity';

export interface ProspectUseCaseInterface {
  validateDuplicatedData(prospectId: string|undefined, commerceUid: string, phone: string): Promise<boolean>;
  createProspect(data: ProspectEntity): Promise<ProspectEntity>;
  findProspectByPhone(
    commerceUid: string,
    phone: string
  ): Promise<ProspectEntity>;
  findProspectsByUserCommerce(
    userCommerceUid: string
  ): Promise<ProspectEntity[]>;
  editProspect(data: ProspectEntity): Promise<ProspectEntity>;
  deleteProspectByUid(uid: string): Promise<void>;
}
