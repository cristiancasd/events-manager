import { EventEntity } from './event.entity';

export interface EventsUseCaseInterface {
  validateDuplicatedData(commerceUid: string, data: string): Promise<boolean>;
  createEvent(input: EventEntity, commerceUid: string): Promise<EventEntity>;
  deleteEventByUid(uid: string): Promise<boolean>;
  findEventByUid(uid: string): Promise<EventEntity>;
  findEventsByCommerce(
    commerceUid: string,
    startDate?: string,
    finishDate?: string
  ): Promise<EventEntity[]>;
}
