import {
  DataBaseError,
  NotFoundError,
  ProspectType,
  codeDbNameDuplicated,
  duplicatedNameMessage,
  errorHandlerUseCase
} from '../../../core';
import {
  TicketProspectFeeEntity,
  TicketProspectFeeRepository,
  TicketProspectFeeUseCaseInterface,
  TicketProspectFeeValue
} from '../domain';

export class TicketProspectfeeUseCase
  implements TicketProspectFeeUseCaseInterface
{
  constructor(
    private readonly _ticketRepository: TicketProspectFeeRepository
  ) {}

  @errorHandlerUseCase
  @errorHandlerUseCase
  async createTicket(
    data: TicketProspectFeeEntity
  ): Promise<TicketProspectFeeEntity> {
    try {
      await this._ticketRepository.findTicketByName(
        data.commerceUid,
        data.name
      );
      throw new DataBaseError(duplicatedNameMessage, codeDbNameDuplicated);
    } catch (err) {
      if (err instanceof NotFoundError) {
        const dataNormalcied = new TicketProspectFeeValue(data);
        return await this._ticketRepository.createTicket(dataNormalcied);
      } else {
        throw err;
      }
    }
  }

  @errorHandlerUseCase
  async findTicketByName(
    commerceUid: string,
    name: ProspectType
  ): Promise<TicketProspectFeeEntity> {
    return await this._ticketRepository.findTicketByName(commerceUid, name);
  }

  @errorHandlerUseCase
  async editTicket(
    data: TicketProspectFeeEntity
  ): Promise<TicketProspectFeeEntity> {
    return await this._ticketRepository.editTicket(data);
  }

  @errorHandlerUseCase
  async getTicketsByCommerce(
    commerceUid: string
  ): Promise<TicketProspectFeeEntity[]> {
    return await this._ticketRepository.getTicketsByCommerce(commerceUid);
  }

  @errorHandlerUseCase
  async deleteTicket(ticketUid: string): Promise<void> {
    return await this._ticketRepository.deleteTicket(ticketUid);
  }
}
