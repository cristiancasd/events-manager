import {
  NotFoundError,
  errorHandlerTypeOrm,
  ServerError,
  codeCommerceNotFound,
  errorMessageCommerceNotFound
} from '../../../../core';

import { connectDB } from '../../../../database';
import { EventsRepository } from '../../domain/events.repository';
import { EventEntity } from '../../domain/event.entity';
import { EventTypeORMEntity } from '../models/event.dto';
import { CommerceTypeORMEntity } from '../../../commerce';
import {
  BadRequestError,
  codeEventNotFound,
  errorMessageEventNotFound
} from '../../../../core';

export class TypeOrmEventRepository implements EventsRepository {
  @errorHandlerTypeOrm
  async findEventByName(
    commerceId: string,
    name: string
  ): Promise<EventEntity | null> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const queryBuilder = eventRepository
      .createQueryBuilder('event')
      .where('event.commerce.id = :commerceId', { commerceId })
      .andWhere('event.name = :name', { name });
    const event = await queryBuilder.getOne();
    if (event) return { ...event, commerceId };
    return null;
  }

  @errorHandlerTypeOrm
  async createEvent(data: EventEntity): Promise<EventEntity> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const newEvent = eventRepository.create(data);
    const commerce = await commerceRepository.findOneBy({
      id: data.commerceId
    });
    if (commerce != null) {
      const algo = new Date(data.date);

      //TODO: add a validation to Date type
      if (isNaN(algo.getTime())) throw new BadRequestError('Invalid date');

      await eventRepository.save({ ...newEvent, commerce: commerce });
      return { ...newEvent, commerceId: commerce.id };
    }
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerTypeOrm
  async deleteEvent(uid: string): Promise<boolean> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const eventToDelete = await eventRepository.findOneBy({ id: uid });
    if (eventToDelete) {
      const deleteResponse = await eventRepository.remove(eventToDelete);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async findEventById(uid: string): Promise<EventEntity> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const event = await eventRepository.findOneBy({ id: uid });
    if (event) {
      const { commerce, ...resto } = event;
      return { ...resto, commerceId: event.commerce.id };
    }

    throw new NotFoundError(errorMessageEventNotFound, codeEventNotFound);
  }

  @errorHandlerTypeOrm
  async findEventsByCommerce(
    commerceId: string,
    startDate?: Date,
    finishDate?: Date
  ): Promise<EventEntity[]> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    const queryBuilder = eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.commerce', 'commerce') // Carga la relación commerce
      .where('event.commerce.id = :commerceId', { commerceId });
    if (startDate && finishDate) {
      // Caso 3: Si viene ambas fechas entonces traer los eventos creados en dicha fecha
      queryBuilder.andWhere('event.date BETWEEN :startDate AND :finishDate', {
        startDate,
        finishDate
      });
    } else if (startDate) {
      // Caso 1: Si viene solo start date, entonces buscar todos los eventos desde la fecha inicial dada
      queryBuilder.andWhere('event.date >= :startDate', { startDate });
    } else if (finishDate) {
      // Caso 2: Si viene solo finish date, traer todos los datos hasta la fecha final
      queryBuilder.andWhere('event.date <= :finishDate', { finishDate });
    }
    const events = await queryBuilder.getMany();
    const algo: EventEntity[] = events.map((data) => {
      console.log('dataaaaa ...', data);
      const { commerce, ...resto } = data;
      return { ...resto, commerceId: data.commerce?.id ?? '' };
    });
    return algo;
  }
}
