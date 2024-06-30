import { TicketProspectFeeEntity } from '..';
import { ProspectType } from '../../../../core';

export interface TicketProspectFeeRepository {
  createTicket(data: TicketProspectFeeEntity): Promise<TicketProspectFeeEntity>;

  editTicket(data: TicketProspectFeeEntity): Promise<TicketProspectFeeEntity>;

  findTicketByName(
    commerceUid: string,
    name: ProspectType
  ): Promise<TicketProspectFeeEntity>;

  getTicketsByCommerce(commerceUid: string): Promise<TicketProspectFeeEntity[]>;

  deleteTicket(ticketUid: string): Promise<void>;
}
