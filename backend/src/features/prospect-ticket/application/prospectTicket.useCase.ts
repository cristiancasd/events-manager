import { NotFoundError, errorHandlerUseCase } from '../../../core';
import {
  ProspectTicketEntity,
  ProspectTicketInputEntity,
  ProspectTicketRepository,
  ProspectTicketUseCaseInterface
} from '../domain';

export class ProspectTicketUseCase implements ProspectTicketUseCaseInterface {
  constructor(
    private readonly _prospectTicketRepository: ProspectTicketRepository
  ) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    prospectUid: string,
    eventUid: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean> {
    try {
      const prospectTicketFound =
        await this._prospectTicketRepository.findProspectTicketByProspectAndEvent(
          prospectUid,
          eventUid
        );
      return !isEditRequest
        ? true
        : prospectTicketFound.id == id
        ? false
        : true;
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
      return false;
    }
  }

  @errorHandlerUseCase
  async findProspectTicketByProspectAndEvent(
    prospectUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity> {
    return await this._prospectTicketRepository.findProspectTicketByProspectAndEvent(
      prospectUid,
      eventUid
    );
  }

  @errorHandlerUseCase
  async createProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity> {
    return await this._prospectTicketRepository.createProspectTicket(data);
  }

  @errorHandlerUseCase
  async editProspectTicket(
    data: ProspectTicketInputEntity
  ): Promise<ProspectTicketEntity> {
    return await this._prospectTicketRepository.editProspectTicket(data);
  }

  @errorHandlerUseCase
  async getProspectsTicketByCommerceAndEvent(
    commerceUid: string,
    eventUid: string
  ): Promise<ProspectTicketEntity[]> {
    return await this._prospectTicketRepository.getProspectsTicketByCommerceAndEvent(
      commerceUid,
      eventUid
    );
  }

  @errorHandlerUseCase
  async deleteProspectTicket(userTicketUid: string): Promise<void> {
    return await this._prospectTicketRepository.deleteProspectTicket(
      userTicketUid
    );
  }
}
