import { ProspectTicketEntity, ProspectTicketInputEntity } from '..';

export interface ProspectTicketRepository {
  createProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity>;

  editProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity>;

  findProspectTicketByUid(userTicketUid: string): Promise<ProspectTicketEntity>;

  findProspectTicketByProspectAndEvent(
    prospectUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity>;

  getProspectsTicketByCommerceAndEvent(
    commerceUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity[]>;

  deleteProspectTicket(userTicketUid: string): Promise<void>;
}
