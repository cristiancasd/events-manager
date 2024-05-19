import { EventEntity } from './event.entity';

export interface EventsUseCaseInterface {
  validateDuplicatedData(
    commerceUid: string,
    data: string,
    id: string | undefined,
    isEditRequest: boolean
  ): Promise<boolean>;
  createEvent(input: EventEntity, commerceUid: string): Promise<EventEntity>;
  editEvent(input: EventEntity): Promise<EventEntity>;
  deleteEventByUid(uid: string): Promise<boolean>;
  findEventByUid(uid: string): Promise<EventEntity>;
  findEventsByCommerce(
    commerceUid: string,
    startDate?: string,
    finishDate?: string
  ): Promise<EventEntity[]>;
}
