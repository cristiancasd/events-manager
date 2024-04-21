import { TicketEntity } from '..';

export interface TicketUseCaseInterface {
  validateDuplicatedData(
    commerceUid: string,
    name: string,

    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean>;

  createTicket(data: TicketEntity): Promise<TicketEntity>;

  editTicket(data: TicketEntity): Promise<TicketEntity>;

  //findTicketByUid(ticketUid: string): Promise<TicketEntity>;

  //findTicketByName(commerceUid: string, name: string): Promise<TicketEntity>;

  getTicketsByCommerce(commerceUid: string): Promise<TicketEntity[]>;

  deleteTicket(ticketUid: string): Promise<void>;
}
