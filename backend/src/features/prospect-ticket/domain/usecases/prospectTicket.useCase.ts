import { ProspectTicketEntity, ProspectTicketInputEntity } from '..';

export interface ProspectTicketUseCaseInterface {
  validateDuplicatedData(
    userCommerceUid: string,
    eventUid: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean>;

  createProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity>;

  editProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity>;

  findProspectTicketByProspectAndEvent(
    userCommerceUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity>;

  getProspectsTicketByCommerceAndEvent(
    commerceUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity[]>;

  deleteProspectTicket(userTicketUid: string): Promise<void>;
}
