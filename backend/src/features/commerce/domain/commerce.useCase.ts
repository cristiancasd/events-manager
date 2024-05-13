import { CommerceEntity, LocationEntity } from '..';
import { CriteriaOptionsStatus, OptionsValidations } from '../../../core';

export interface CommerceUseCaseInterface {
  validateDuplicatedData(
    option: OptionsValidations,
    data: string
  ): Promise<boolean>;
  createCommerce(input: CommerceEntity): Promise<CommerceEntity>;
  deleteCommerceByUid(uid: string): Promise<boolean>;
  disableCommerceByUid(uid: string): Promise<boolean>;
  enableCommerceByUid(uid: string): Promise<boolean>;
  findComerceByUid(uid: string): Promise<CommerceEntity>;
  //meDataByUid(commerceUid: string): Promise<CommerceEntity>;
  findCommerces(
    status?: CriteriaOptionsStatus,
    location?: LocationEntity
  ): Promise<CommerceEntity[]>;
}
