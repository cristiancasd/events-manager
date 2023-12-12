import { CriteriaOptionsStatus, CustomError, DataBaseError, NotFoundError, ServerError } from "../../../core";
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
 
 
 
  public validateDuplicatedData = async (option: OptionsValidations, data: string) => {

    try {
      const result = await this._commerceRepository.findByUniqueColumn(option, data);
      return result
        ? true
        : false
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }

  };
  public createCommerce = async (input: CommerceEntity) => {

    try {
      const commerceValue = new CommerceValue(input);
      return await this._commerceRepository.createCommerce(commerceValue);
    } catch (err) {
      if (err instanceof CustomError) {

        if (err instanceof DataBaseError) {
          console.log('****código de error:', err.code);

          //TODO: implement search by PHONE/NAME/EMAIL

          ///Return respective error
          /// Duplicated phone
          /// Duplicated email
          /// Duplicated name


        }

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
