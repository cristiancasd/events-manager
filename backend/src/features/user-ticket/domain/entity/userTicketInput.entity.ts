export interface UserTicketInputEntity {
  id?: string;
  hasPresale: boolean;
  fee: number;
  totalAttendees: number;
  userCommerceUid: string;
  eventUid: string;
}
