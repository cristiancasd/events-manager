export interface UserTicketEntity {
  id: string;
  userName: string;
  levelName: string;
  hasPresale: boolean;
  totalAttendees: number;
  fee: number;
  userCommerceUid: string;
  eventUid: string;
}
