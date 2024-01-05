
import { CriteriaOptionsStatus, NotFoundError, OptionsValidations, errorHandlerUseCase } from "../../../core";
import { EventEntity } from "../domain/event.entity";
import { EventValue } from "../domain/event.value";
import { EventsRepository } from "../domain/events.repository";
import { EventsUseCaseInterface } from "../domain/events.useCase";


export class EventsUseCase implements EventsUseCaseInterface {
  constructor(private readonly _eventsRepository: EventsRepository) { }

  @errorHandlerUseCase
  async createEvent(input: EventEntity, eventId: string): Promise<EventEntity> {
    const eventValue = new EventValue(input);
    return await this._eventsRepository.createEvent(eventValue, eventId);
  };

  @errorHandlerUseCase
  async deleteEventByUid(uid: string): Promise<boolean> {
    const result = await this._eventsRepository.deleteEvent(uid);
    if (result) return result;
    throw new NotFoundError();
  };

  @errorHandlerUseCase
  async findEventByUid(uid: string): Promise<EventEntity> {
    return await this._eventsRepository.findEventById(uid);
  };

  @errorHandlerUseCase
  async findEventsByCommerce(commerceId: string, startDate?: Date, finishDate?: Date): Promise<EventEntity[]> {
    return await this._eventsRepository.findEventsByCommerce(commerceId, startDate, finishDate);
  };
}
