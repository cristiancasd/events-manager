import {
  CommerceUserRoles,
  CriteriaOptionsStatus,
  NotFoundError,
  OptionsValidations,
  codeCommerceNotFound,
  errorHandlerUseCase,
  errorMessageCommerceNotFound
} from '../../../core';
import { AuthUseCase } from '../../auth';
import {
  CommerceEntity,
  CommerceRepository,
  CommerceUseCaseInterface,
  CommerceValue,
  LocationEntity
} from '../domain';

export class CommerceUseCase implements CommerceUseCaseInterface {
  constructor(
    //private readonly _authUseCase: AuthUseCase,
    private readonly _commerceRepository: CommerceRepository

  ) { }

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



  /*@errorHandlerUseCase
  async meDataByUid(token: string): Promise<CommerceEntity> {
    const { commerceUid, role } = await this._authUseCase.getTokenData(token);

    
    const commerceMaster: CommerceEntity = {
      city: 'master',
      countryCode: 'master',
      dateFinish: 'master',
      email: 'master',
      id: 'master',
      isActive: true,
      name: 'master',
      nick: 'master',
      phone: 'master',
      totalFreePresale: 0,
    }

    if (role == CommerceUserRoles.masterAdmin){
      console.log('is master user')
      return commerceMaster;
    }
    
    console.log('is normal user')
    return await this._commerceRepository.findCommerceById(commerceUid);
  }*/
@errorHandlerUseCase
async findComerceByUid(uid: string): Promise < CommerceEntity > {
  return await this._commerceRepository.findCommerceById(uid);
}

@errorHandlerUseCase
async findCommerces(
  status ?: CriteriaOptionsStatus,
  location ?: LocationEntity
): Promise < CommerceEntity[] > {
  return await this._commerceRepository.findCommerces(status, location);
}
}
