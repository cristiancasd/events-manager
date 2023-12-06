import { CriteriaOptionsStatus, CustomError, DataBaseError, NotFoundError, ServerError } from "../../../core";
import { CommerceEntity } from "../domain/commerce.entity";
import { CommerceRepository } from "../domain/commerce.repository";
import { CommerceValue } from "../domain/commerce.value";
import { LocationEntity } from "../domain/location.entity";


interface commerceInput {
  name: string;
  email: string;
  countryCode: string;
  city: string;
  totalFreePrevent: number;
  isActive: boolean;
  dataFinish: string;
}

export class CommerceUseCase {
  constructor(private readonly _commerceRepository: CommerceRepository) { }
  public createCommerce = async (input: CommerceEntity) => {

    try {
      const commerceValue = new CommerceValue(input);
      return await this._commerceRepository.createCommerce(commerceValue);
    } catch (err) {

      if (err instanceof CustomError) {
        throw err;
      }

      throw new ServerError();
    }


  };

  public deleteCommerceByUid = async (uid: string) => {

    try {
      const result = await this._commerceRepository.deleteCommerce(uid);
      if (result) return result;
      throw new NotFoundError();

    } catch (err) {
      if (err instanceof CustomError) {
        console.log('opcion 1');
        throw err;
      }
      console.log('opcion 2');

      throw new ServerError();
    }
  };

  public disableCommerceByUid = async (uid: string) => {

    try {
      const result = await this._commerceRepository.disableCommerce(uid);
      if (result) return result;
      throw new NotFoundError();

    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  }

  public enableCommerceByUid = async (uid: string) => {

    try {
      const result = await this._commerceRepository.enableCommerce(uid);
      if (result) return result;
      throw new NotFoundError();

    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  }

  public findComerceByUid = async (uid: string) => {

    try {
      return await this._commerceRepository.findCommerceById(uid);
    } catch (err) {

      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }

  };


  public findCommerces = async (status?: CriteriaOptionsStatus, location?: LocationEntity) => {

    try {
      return await this._commerceRepository.findCommerces(status, location)
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }

  };


}
