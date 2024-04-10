import { ProspectEntity } from './prospects.entity';

export interface ProspectRepository {
  createProspect(data: ProspectEntity): Promise<ProspectEntity>;
  findProspectByPhone(
    commerceUid: string,
    phone: string
  ): Promise<ProspectEntity>;
  findProspectByUid(prospectUid: string): Promise<ProspectEntity>;
  findProspectsByUserCommerce(
    userCommerceUid: string
  ): Promise<ProspectEntity[]>;
  editProspect(data: ProspectEntity): Promise<ProspectEntity>;
  deleteProspect(prospectUid: string): Promise<void>;
}
