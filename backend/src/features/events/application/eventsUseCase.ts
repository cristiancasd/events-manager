import {
  CriteriaOptionsStatus,
  NotFoundError,
  OptionsValidations,
  errorHandlerUseCase
} from '../../../core';
import { codeEventNotFound, errorMessageEventNotFound } from '../../../core';
import { EventEntity } from '../domain/event.entity';
import { EventValue } from '../domain/event.value';
import { EventsRepository } from '../domain/events.repository';
import { EventsUseCaseInterface } from '../domain/events.useCase';

export class EventsUseCase implements EventsUseCaseInterface {
  constructor(private readonly _eventsRepository: EventsRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceUid: string,
    data: string,
    id: string | undefined,
    isEditRequest: boolean

  ): Promise<boolean> {

    try{
      const result = await this._eventsRepository.findEventByName(
        commerceUid,
        data
      );
  
      return !isEditRequest ? true : result.id==id ? false: true;
      
    }catch(err){
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
      return false;
    }
   
  }

  @errorHandlerUseCase
  async createEvent(input: EventEntity): Promise<EventEntity> {
    const eventValue = new EventValue(input);
    return await this._eventsRepository.createEvent(eventValue);
  }

  @errorHandlerUseCase
  async editEvent(input: EventEntity): Promise<EventEntity> {
    const eventValue = new EventValue(input);
    return await this._eventsRepository.editEvent(eventValue);
  }

  @errorHandlerUseCase
  async deleteEventByUid(uid: string): Promise<boolean> {
    const result = await this._eventsRepository.deleteEvent(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageEventNotFound, codeEventNotFound);
  }

  @errorHandlerUseCase
  async findEventByUid(uid: string): Promise<EventEntity> {
    return await this._eventsRepository.findEventById(uid);
  }

  @errorHandlerUseCase
  async findEventsByCommerce(
    commerceUid: string,
    startDate?: string,
    finishDate?: string
  ): Promise<EventEntity[]> {
    let startDateTime = startDate ? new Date(startDate) : undefined;
    let finishDateTime = finishDate ? new Date(finishDate) : undefined;

    if ((startDateTime && isNaN(startDateTime.getTime())) || !startDateTime)
      startDateTime = undefined;

    if ((finishDateTime && isNaN(finishDateTime.getTime())) || !finishDateTime)
      finishDateTime = undefined;

    return await this._eventsRepository.findEventsByCommerce(
      commerceUid,
      startDateTime,
      finishDateTime
    );
  }
}
