import { CommerceEntity } from '../../domain/commerce.entity';
import { CommerceRepository } from '../../domain/commerce.repository';
import { CommerceTypeORMEntity } from '../models/commerce.dto';
import connectDB from '../../../../database/typeorm.connection';
import { NotFoundError, errorHandlerTypeOrm, InactiveDataError, CriteriaOptionsStatus, CriteriaOptionsLocation } from '../../../../core';
import { FindManyOptions } from 'typeorm';
import { LocationEntity } from '../../domain/location.entity';


export class TypeOrmCommerceRepository implements CommerceRepository {

  @errorHandlerTypeOrm
  async createCommerce(data: CommerceEntity): Promise<CommerceEntity> {

    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const newCommerce = commerceRepository.create(data);
    await commerceRepository.save(newCommerce);
    return newCommerce;


  }

  async deleteCommerce(uid: string): Promise<Boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerceToDelete = await commerceRepository.findOneBy({ id: uid })

    if (commerceToDelete) {
      const deleteResponse = await commerceRepository.remove(commerceToDelete);
      return true;
      // ...
    } else {
      return false;
    }
  }

  async disableCommerce(uid: string): Promise<Boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerce = await commerceRepository.findOneBy({ id: uid })

    if (commerce) {
      commerce.isActive = false;
      const disabledCommerce = await commerceRepository.save(commerce);
      return true;
      // ...
    } else {
      return false;
    }
  }

  async enableCommerce(uid: string): Promise<Boolean> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const commerce = await commerceRepository.findOneBy({ id: uid })

    if (commerce) {
      commerce.isActive = true;
      const disabledCommerce = await commerceRepository.save(commerce);
      return true;
      // ...
    } else {
      return false;
    }
  }

  async findCommerceById(uid: string, onlyAcitve?: Boolean): Promise<CommerceEntity> {
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const commerce = await commerceRepository.findOneBy({ id: uid })

    if (commerce) {
      if (onlyAcitve == true) {
        if (commerce.isActive) {
          return commerce;
        } else {
          throw new InactiveDataError;
        }
      }
    }
    if (commerce) return commerce;
    throw new NotFoundError;
  }

  async findCommerces(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<CommerceEntity[]> {

    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const conditions: FindManyOptions<CommerceTypeORMEntity> = {};

    if (status !== null && status !== undefined) {
      conditions.where = {
        ...conditions.where, isActive: status == CriteriaOptionsStatus.active
      };
    }

    if (location !== null && location !== undefined) {
      if (location.type == CriteriaOptionsLocation.city) {
        conditions.where = {
          ...conditions.where, city: location.name
        };
      } else {
        conditions.where = {
          ...conditions.where, countryCode: location.name
        };
      }
    }
    console.log('conditions ' + conditions);
    return await commerceRepository.find(conditions);
  }
}
