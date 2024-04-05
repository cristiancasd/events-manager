import { NotFoundError, errorHandlerUseCase } from '../../../core';
import {
  ProspectEntity,
  ProspectRepository,
  ProspectUseCaseInterface,
  ProspectValue
} from '../domain';

export class ProspectsUseCase implements ProspectUseCaseInterface {
  constructor(private readonly _prospectRepository: ProspectRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    phone: string,
    commerceUserId: string
  ): Promise<boolean> {
    let phoneFound = false;
    if (phone != null) {
      try {
        await this._prospectRepository.findProspectByPhone(
          commerceUserId,
          phone
        );
        phoneFound = true;
      } catch (err) {
        if (!(err instanceof NotFoundError)) {
          throw err;
        }
      }
    }
    return phoneFound;
  }

  @errorHandlerUseCase
  async createProspect(data: ProspectEntity): Promise<ProspectEntity> {
    return await this._prospectRepository.createProspect(data);
  }

  @errorHandlerUseCase
  async findProspectByPhone(
    commerceUid: string,
    phone: string
  ): Promise<ProspectEntity> {
    return await this._prospectRepository.findProspectByPhone(
      commerceUid,
      phone
    );
  }

  @errorHandlerUseCase
  async findProspectsByUserCommerce(
    userCommerceUid: string
  ): Promise<ProspectEntity[]> {
    return await this._prospectRepository.findProspectsByUserCommerce(
      userCommerceUid
    );
  }

  @errorHandlerUseCase
  async editProspect(data: ProspectEntity): Promise<ProspectEntity> {
    return await this._prospectRepository.editProspect(data);
  }

  @errorHandlerUseCase
  async deleteProspectByUid(uid: string): Promise<void> {
    return await this._prospectRepository.deleteProspect(uid);
  }
}
