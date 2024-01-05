import { EventEntity } from "./event.entity";

export interface EventsUseCaseInterface {
    createEvent(input: EventEntity, commerceId: string): Promise<EventEntity>;
    deleteEventByUid(uid: string): Promise<boolean>;
    findEventByUid(uid: string): Promise<EventEntity>;
    findEventsByCommerce(commerceId: string, startDate?: Date, finishDate?: Date): Promise<EventEntity[]>;
}
