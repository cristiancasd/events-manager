import { NotFoundError, errorHandlerUseCase } from '../../../core';
import {
  UserTicketEntity,
  UserTicketInputEntity,
  UserTicketRepository,
  UserTicketUseCaseInterface
} from '../domain';

export class UserTicketUseCase implements UserTicketUseCaseInterface {
  constructor(private readonly _userTicketRepository: UserTicketRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    userCommerceUid: string,
    eventUid: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean> {
    try {
      const userTicketFound =
        await this._userTicketRepository.findUserTicketByUserAndEvent(
          userCommerceUid,
          eventUid
        );
      return !isEditRequest ? true : userTicketFound.id == id ? false : true;
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
      return false;
    }
  }

  @errorHandlerUseCase
  async findUserTicketByUserAndEvent(
    userCommerceUid: string,
    eventUid: string
  ): Promise<UserTicketEntity> {
    return await this._userTicketRepository.findUserTicketByUserAndEvent(
      userCommerceUid,
      eventUid
    );
  }

  @errorHandlerUseCase
  async createUserTicket(
    data: UserTicketInputEntity
  ): Promise<UserTicketEntity> {
    return await this._userTicketRepository.createUserTicket(data);
  }

  @errorHandlerUseCase
  async editUserTicket(data: UserTicketInputEntity): Promise<UserTicketEntity> {
    return await this._userTicketRepository.editUserTicket(data);
  }

  @errorHandlerUseCase
  async getUsersTicketByCommerceAndLevel(
    commerceUid: string,
    levelUid: string
  ): Promise<UserTicketEntity[]> {
    return await this._userTicketRepository.getUsersTicketByCommerceAndLevel(
      commerceUid,
      levelUid
    );
  }

  @errorHandlerUseCase
  async deleteUserTicket(userTicketUid: string): Promise<void> {
    return await this._userTicketRepository.deleteUserTicket(userTicketUid);
  }
}
