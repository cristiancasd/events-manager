
import { FindManyOptions } from 'typeorm';
import { codeDbError, NotFoundError, errorHandlerTypeOrm, InactiveDataError, CriteriaOptionsStatus, CriteriaOptionsLocation, DataBaseError, ServerError, OptionsValidations, codeCommerceNotFound } from '../../../../core';

import { connectDB } from '../../../../database';
import { EventRepository } from '../../domain/events.repository';
import { EventEntity } from '../../domain/events.entity';
import { EventTypeORMEntity } from '../models/event.dto';
import { CommerceTypeORMEntity } from '../../../commerce';

export class TypeOrmEventRepository implements EventRepository {

  @errorHandlerTypeOrm
  async createEvent(data: EventEntity, commerceId: string): Promise<EventEntity> {


    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);

    const newEvent = eventRepository.create(data);
    const commerce = await commerceRepository.findOneBy({ id: commerceId })

    if (commerce != null) {
      await eventRepository.save({ ...newEvent, commerce: commerce });
      return { ...newEvent, commerceId: commerce?.id ?? '' };
    }
    throw new ServerError(codeCommerceNotFound);
  }

  @errorHandlerTypeOrm
  async deleteEvent(uid: string): Promise<boolean> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    const commerceToDelete = await eventRepository.findOneBy({ id: uid })

    if (commerceToDelete) {
      const deleteResponse = await eventRepository.remove(commerceToDelete);
      return true;
      // ...
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async disableEvent(uid: string): Promise<boolean> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    const commerce = await eventRepository.findOneBy({ id: uid })

    if (commerce) {
      commerce.isActive = false;
      const disabledEvent = await eventRepository.save(commerce);
      return true;
      // ...
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async enableEvent(uid: string): Promise<boolean> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    const commerce = await eventRepository.findOneBy({ id: uid })

    if (commerce) {
      commerce.isActive = true;
      const disabledEvent = await eventRepository.save(commerce);
      return true;
      // ...
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async findEventById(uid: string, onlyAcitve?: boolean): Promise<EventEntity> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const commerce = await eventRepository.findOneBy({ id: uid })

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

  @errorHandlerTypeOrm
  async findEvents(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<EventEntity[]> {

    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const conditions: FindManyOptions<EventTypeORMEntity> = {};

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
    return await eventRepository.find(conditions);
  }

  @errorHandlerTypeOrm
  async findByUniqueColumn(option: OptionsValidations, data: string): Promise<EventEntity> {

    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    if (option == OptionsValidations.name) {
      const result = await eventRepository.find({ where: { name: data } });

      if (result.length > 0) {
        return result[0];
      }
    }

    if (option == OptionsValidations.phone) {
      const result = await eventRepository.find({ where: { phone: +data } });
      if (result.length > 0) {
        return result[0];
      }
    }

    if (option == OptionsValidations.email) {
      const result = await eventRepository.find({ where: { email: data } });
      if (result.length > 0) {
        return result[0];
      }
    }

    throw new DataBaseError('', codeDbError);
  }

}
