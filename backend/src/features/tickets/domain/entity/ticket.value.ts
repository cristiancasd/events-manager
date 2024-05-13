import { v4 as uuid } from 'uuid';
import { TicketEntity } from './ticket.entity';

export class TicketValue implements TicketEntity {
  id: string;
  name: string;
  presaleFee: number;
  saleFee: number;
  levelUid: string;
  commerceUid: string;
  constructor({
    id,
    name,
    presaleFee,
    saleFee,
    levelUid,
    commerceUid
  }: {
    id?: string | undefined;
    name: string;
    presaleFee: number;
    saleFee: number;
    levelUid: string;
    commerceUid: string;
  }) {
    this.id = id ?? uuid();
    this.name = name;
    this.presaleFee = presaleFee;
    this.saleFee = saleFee;
    this.levelUid = levelUid;
    this.commerceUid = commerceUid;
  }
}
