import { UserTicketEntity, UserTicketInputEntity } from '..';

export interface UserTicketUseCaseInterface {
  validateDuplicatedData(
    userCommerceUid: string,
    eventUid: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean>;

  createUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity>;

  editUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity>;

  findUserTicketByUserAndEvent(
    userCommerceUid: string,
    eventUid: string
  ): Promise<UserTicketEntity>;

  getUsersTicketByCommerceAndLevel(
    commerceUid: string,
    levelUid: string
  ): Promise<UserTicketEntity[]>;

  deleteUserTicket(userTicketUid: string): Promise<void>;
}
