import { NotFoundError, errorHandlerUseCase } from '../../../core';
import {
  TicketEntity,
  TicketRepository,
  TicketUseCaseInterface
} from '../domain';

export class TicketUseCase implements TicketUseCaseInterface {
  constructor(private readonly _ticketRepository: TicketRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceUid: string,
    name: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean> {
    try {
      const ticketFound = await this._ticketRepository.findTicketByName(
        commerceUid,
        name
      );
      return !isEditRequest ? true : ticketFound.id == id ? false : true;
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
      return false;
    }
  }

  @errorHandlerUseCase
  async createTicket(data: TicketEntity): Promise<TicketEntity> {
    return await this._ticketRepository.createTicket(data);
  }

  @errorHandlerUseCase
  async editTicket(data: TicketEntity): Promise<TicketEntity> {
    return await this._ticketRepository.editTicket(data);
  }

  @errorHandlerUseCase
  async getTicketsByCommerce(commerceUid: string): Promise<TicketEntity[]> {
    return await this._ticketRepository.getTicketsByCommerce(commerceUid);
  }

  @errorHandlerUseCase
  async deleteTicket(ticketUid: string): Promise<void> {
    return await this._ticketRepository.deleteTicket(ticketUid);
  }
}
