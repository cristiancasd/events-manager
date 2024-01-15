import { EventEntity } from "./event.entity";

export interface EventsUseCaseInterface {
    validateDuplicatedData(commerceId: string, data: string): Promise<boolean>;
    createEvent(input: EventEntity, commerceId: string): Promise<EventEntity>;
    deleteEventByUid(uid: string): Promise<boolean>;
    findEventByUid(uid: string): Promise<EventEntity>;
    findEventsByCommerce(commerceId: string, startDate?: string, finishDate?: string): Promise<EventEntity[]>;
}
