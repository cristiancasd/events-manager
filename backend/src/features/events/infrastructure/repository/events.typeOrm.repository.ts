import {
  NotFoundError,
  errorHandlerTypeOrm,
  ServerError,
  codeCommerceNotFound,
  errorMessageCommerceNotFound,
  DataBaseError,
  errorMsgDb
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
import { EventValue } from '../../domain/event.value';

export class TypeOrmEventRepository implements EventsRepository {
  @errorHandlerTypeOrm
  async findEventByName(
    commerceUid: string,
    name: string
  ): Promise<EventEntity > {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const queryBuilder = eventRepository
      .createQueryBuilder('event')
      .where('event.commerce.id = :commerceUid', { commerceUid })
      .andWhere('event.name = :name', { name });
    const event = await queryBuilder.getOne();
    if (!event)
      throw new NotFoundError(errorMessageEventNotFound, codeEventNotFound);

    return { ...event, commerceUid };
  }

  @errorHandlerTypeOrm
  async createEvent(data: EventEntity): Promise<EventEntity> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const newEvent = eventRepository.create(data);
    const commerce = await commerceRepository.findOneBy({
      id: data.commerceUid
    });
    if (commerce != null) {
      const validDate = new Date(data.date);

      //TODO: add a validation to Date type
      if (isNaN(validDate.getTime())) throw new BadRequestError('Invalid date');

      const saved = await eventRepository.save({
        ...newEvent,
        commerce: commerce
      });

      return new EventValue({
        ...saved,
        commerceUid: saved.commerce.id
      });
    }
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }


  @errorHandlerTypeOrm
  async editEvent(data: EventEntity): Promise<EventEntity> {

    const eventRepository = connectDB.getRepository(EventTypeORMEntity);
    const eventFound = await eventRepository.findOneBy({ id: data.id });
    if (!eventFound)
      throw new NotFoundError(errorMessageEventNotFound, codeEventNotFound);

    console.log('*****eventFound', eventFound)
    console.log('*****dataInput', data)

    const eventSaved = await eventRepository.save({
      ...eventFound,
      ...data
    });

    console.log('*****eventSaved', eventSaved)

    if (!eventSaved) throw new DataBaseError(errorMsgDb);
    return new EventValue({
      ...eventSaved,
      commerceUid: eventSaved.commerce.id
    });

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
      return { ...resto, commerceUid: event.commerce.id };
    }

    throw new NotFoundError(errorMessageEventNotFound, codeEventNotFound);
  }

  @errorHandlerTypeOrm
  async findEventsByCommerce(
    commerceUid: string,
    startDate?: Date,
    finishDate?: Date
  ): Promise<EventEntity[]> {
    const eventRepository = connectDB.getRepository(EventTypeORMEntity);

    const queryBuilder = eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.commerce', 'commerce') // Carga la relación commerce
      .where('event.commerce.id = :commerceUid', { commerceUid });
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
    const eventsEntityArray: EventEntity[] = events.map((data) => {
      const { commerce, ...resto } = data;
      return { ...resto, commerceUid: data.commerce?.id ?? '' };
    });
    return eventsEntityArray;
  }
}
