import {
  CriteriaOptionsStatus,
  NotFoundError,
  OptionsValidations,
  codeCommerceNotFound,
  errorHandlerUseCase,
  errorMessageCommerceNotFound
} from '../../../core';
import {
  CommerceEntity,
  CommerceRepository,
  CommerceUseCaseInterface,
  CommerceValue,
  LocationEntity
} from '../domain';

export class CommerceUseCase implements CommerceUseCaseInterface {
  constructor(private readonly _commerceRepository: CommerceRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    option: OptionsValidations,
    data: string
  ): Promise<boolean> {
    const result = await this._commerceRepository.findByUniqueColumn(
      option,
      data
    );
    return result ? true : false;
  }

  @errorHandlerUseCase
  async createCommerce(input: CommerceEntity): Promise<CommerceEntity> {
    const commerceValue = new CommerceValue(input);

    return await this._commerceRepository.createCommerce(commerceValue);
  }

  @errorHandlerUseCase
  async deleteCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.deleteCommerce(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerUseCase
  async disableCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.disableCommerce(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerUseCase
  async enableCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.enableCommerce(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerUseCase
  async findComerceByUid(uid: string): Promise<CommerceEntity> {
    return await this._commerceRepository.findCommerceById(uid);
  }

  @errorHandlerUseCase
  async findCommerces(
    status?: CriteriaOptionsStatus,
    location?: LocationEntity
  ): Promise<CommerceEntity[]> {
    return await this._commerceRepository.findCommerces(status, location);
  }
}
