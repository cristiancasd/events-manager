import { CriteriaOptionsStatus } from '../../../core';
import { EventEntity } from './event.entity';

export interface EventsRepository {
  findEventByName(
    commerceId: string,
    name: string
  ): Promise<EventEntity | null>;
  createEvent(event: EventEntity): Promise<EventEntity>;
  deleteEvent(uid: string): Promise<boolean>;
  findEventById(uid: string): Promise<EventEntity>;
  findEventsByCommerce(
    commerceId: string,
    startDate?: Date,
    finishDate?: Date
  ): Promise<EventEntity[]>;
}
