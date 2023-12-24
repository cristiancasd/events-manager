import { CriteriaOptionsStatus, CustomError, DataBaseError, NotFoundError, ServerError } from "../../../core";
import { errorHandlerUseCase } from "../../../core/application/middlewares/errorHandlerUseCase";
import { OptionsValidations, codeDbErrorDuplicated } from "../../../core/shared/constants";
import { CommerceEntity } from "../domain/commerce.entity";
import { CommerceRepository } from "../domain/commerce.repository";
import { CommerceValue } from "../domain/commerce.value";
import { LocationEntity } from "../domain/location.entity";
import { ICommerceService } from "./commerce.interfaz";


interface commerceInput {
  name: string;
  email: string;
  countryCode: string;
  city: string;
  totalFreePrevent: number;
  isActive: boolean;
  dataFinish: string;
}


export class CommerceUseCase implements ICommerceService {
  constructor(private readonly _commerceRepository: CommerceRepository) { }

  @errorHandlerUseCase
  async validateDuplicatedData(option: OptionsValidations, data: string): Promise<boolean> {
    const result = await this._commerceRepository.findByUniqueColumn(option, data);
    return result
      ? true
      : false
  };

  @errorHandlerUseCase
  async createCommerce(input: CommerceEntity): Promise<CommerceEntity> {
    const commerceValue = new CommerceValue(input);
    return await this._commerceRepository.createCommerce(commerceValue);
  };

  @errorHandlerUseCase
  async deleteCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.deleteCommerce(uid);
    if (result) return result;
    throw new NotFoundError();
  };

  @errorHandlerUseCase
  async disableCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.disableCommerce(uid);
    if (result) return result;
    throw new NotFoundError();
  }

  @errorHandlerUseCase
  async enableCommerceByUid(uid: string): Promise<boolean> {
    const result = await this._commerceRepository.enableCommerce(uid);
    if (result) return result;
    throw new NotFoundError();
  }

  @errorHandlerUseCase
  async findComerceByUid(uid: string): Promise<CommerceEntity> {
    return await this._commerceRepository.findCommerceById(uid);
  };

  @errorHandlerUseCase
  async findCommerces(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<CommerceEntity[]> {
    return await this._commerceRepository.findCommerces(status, location)
  };
}
