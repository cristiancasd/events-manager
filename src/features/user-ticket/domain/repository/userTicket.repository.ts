import { UserTicketEntity, UserTicketInputEntity } from '..';

export interface UserTicketRepository {
  createUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity>;

  editUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity>;

  findUserTicketByUid(userTicketUid: string): Promise<UserTicketEntity>;

  getUsersTicketByCommerceAndLevel(
    commerceUid: string,
    levelUid: string
  ): Promise<UserTicketEntity[]>;

  deleteUserTicket(userTicketUid: string): Promise<void>;
}
