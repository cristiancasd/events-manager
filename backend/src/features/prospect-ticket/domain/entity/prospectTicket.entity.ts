import { ProspectType } from '../../../../core';

export interface ProspectTicketEntity {
  id: string;
  prospectName: string;
  prospectType: ProspectType;
  fee: number;
  prospectUid: string;
  eventUid: string;
}
