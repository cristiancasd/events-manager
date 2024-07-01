import { ProspectType } from '../../../../core';

export interface TicketProspectFeeEntity {
  id: string;
  name: ProspectType;
  fee: number;
  commerceUid: string;
}
