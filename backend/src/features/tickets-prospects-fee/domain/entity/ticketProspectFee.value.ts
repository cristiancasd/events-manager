import { v4 as uuid } from 'uuid';
import { TicketProspectFeeEntity } from './ticketProspectFee.entity';
import { ProspectType } from '../../../../core';

export class TicketProspectFeeValue implements TicketProspectFeeEntity {
  id: string;
  name: ProspectType;
  fee: number;
  commerceUid: string;
  constructor({
    id,
    name,
    fee,
    commerceUid
  }: {
    id?: string | undefined;
    name: ProspectType;
    fee: number;
    commerceUid: string;
  }) {
    this.id = id ?? uuid();
    this.name = name;
    this.fee = fee;
    this.commerceUid = commerceUid;
  }
}
