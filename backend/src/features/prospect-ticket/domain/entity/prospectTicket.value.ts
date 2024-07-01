import { v4 as uuid } from 'uuid';
import { ProspectTicketEntity } from './prospectTicket.entity';
import { ProspectType } from '../../../../core';

export class ProspectTicketValue implements ProspectTicketEntity {
  id: string;
  prospectName: string;
  prospectType: ProspectType;
  fee: number;
  prospectUid: string;
  eventUid: string;
  constructor({
    id,
    prospectName,
    prospectType,
    fee,
    prospectUid,
    eventUid
  }: {
    id?: string | undefined;
    prospectName: string;
    prospectType: ProspectType;
    fee: number;
    prospectUid: string;
    eventUid: string;
  }) {
    this.id = id ?? uuid();
    this.prospectName = prospectName;
    this.prospectType = prospectType;
    this.fee = fee;
    this.prospectUid = prospectUid;
    this.eventUid = eventUid;
  }
}
