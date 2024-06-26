import { FindManyOptions } from 'typeorm';
import {
  codeDbError,
  NotFoundError,
  errorHandlerTypeOrm,
  InactiveDataError,
  CriteriaOptionsStatus,
  CriteriaOptionsLocation,
  DataBaseError,
  ServerError,
  OptionsValidations,
  errorMessageCommerceNotFound,
  codeCommerceNotFound
} from '../../../../core';
import {
  CommerceEntity,
  CommerceRepository,
  CommerceValue,
  LocationEntity
} from '../..';
import { CommerceTypeORMEntity } from '..';
import { connectDB } from '../../../../database';

export class TypeOrmCommerceRepository implements CommerceRepository {
  @errorHandlerTypeOrm
  async findCommerceById(
    uid: string,
    onlyAcitve?: boolean
  ): Promise<CommerceEntity> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const commerce = await commerceRepository.findOneBy({ id: uid });

    if (commerce) {
      if (onlyAcitve == true) {
        if (commerce.isActive) {
          return commerce;
        } else {
          throw new InactiveDataError();
        }
      }
    }
    if (commerce) return commerce;
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerTypeOrm
  async createCommerce(data: CommerceEntity): Promise<CommerceEntity> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const { id, ...resto } = data;
    const newCommerce = commerceRepository.create(resto);
    const commerce = await commerceRepository.save(newCommerce);
    return new CommerceValue(commerce);
  }

  @errorHandlerTypeOrm
  async deleteCommerce(uid: string): Promise<boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerceToDelete = await commerceRepository.findOneBy({ id: uid });

    if (commerceToDelete) {
      const deleteResponse = await commerceRepository.remove(commerceToDelete);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async disableCommerce(uid: string): Promise<boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerce = await commerceRepository.findOneBy({ id: uid });

    if (commerce) {
      commerce.isActive = false;
      await commerceRepository.save(commerce);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async enableCommerce(uid: string): Promise<boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerce = await commerceRepository.findOneBy({ id: uid });

    if (commerce) {
      commerce.isActive = true;
      await commerceRepository.save(commerce);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async findCommerces(
    status?: CriteriaOptionsStatus,
    location?: LocationEntity
  ): Promise<CommerceEntity[]> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const conditions: FindManyOptions<CommerceTypeORMEntity> = {};

    if (status !== null && status !== undefined) {
      conditions.where = {
        ...conditions.where,
        isActive: status == CriteriaOptionsStatus.active
      };
    }

    if (location !== null && location !== undefined) {
      if (location.type == CriteriaOptionsLocation.city) {
        conditions.where = {
          ...conditions.where,
          city: location.name
        };
      } else {
        conditions.where = {
          ...conditions.where,
          countryCode: location.name
        };
      }
    }
    return await commerceRepository.find(conditions);
  }

  @errorHandlerTypeOrm
  async findByUniqueColumn(
    option: OptionsValidations,
    data: string
  ): Promise<CommerceEntity> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    if (option == OptionsValidations.nick) {
      const result = await commerceRepository.find({
        where: { nick: data.toLowerCase() }
      });

      if (result.length > 0) {
        return result[0];
      }
    }

    if (option == OptionsValidations.name) {
      const result = await commerceRepository.find({ where: { name: data } });

      if (result.length > 0) {
        return result[0];
      }
    }

    if (option == OptionsValidations.phone) {
      const result = await commerceRepository.find({ where: { phone: data } });
      if (result.length > 0) {
        return result[0];
      }
    }

    if (option == OptionsValidations.email) {
      const result = await commerceRepository.find({ where: { email: data } });
      if (result.length > 0) {
        return result[0];
      }
    }

    throw new DataBaseError('', codeDbError);
  }
}
