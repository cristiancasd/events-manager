import { v4 as uuid } from 'uuid';
import { UserTicketEntity } from './userTicket.entity';

export class UserTicketValue implements UserTicketEntity {
  id: string;
  userName: string;
  levelName: string;
  hasPresale: boolean;
  totalAttendees: number;
  fee: number;
  userCommerceUid: string;
  eventUid: string;
  constructor({
    id,
    userName,
    levelName,
    hasPresale,
    totalAttendees,
    fee,
    userCommerceUid,
    eventUid
  }: {
    id?: string | undefined;
    userName: string;
    levelName: string;
    hasPresale: boolean;
    totalAttendees: number;
    fee: number;
    userCommerceUid: string;
    eventUid: string;
  }) {
    this.id = id ?? uuid();
    this.userName = userName;
    this.levelName = levelName;
    this.hasPresale = hasPresale;
    this.totalAttendees = totalAttendees;
    this.fee = fee;
    this.userCommerceUid = userCommerceUid;
    this.eventUid = eventUid;
  }
}
