import { CriteriaOptionsStatus } from "../../../core";
import { EventEntity } from "./event.entity";


export interface EventsRepository {
  createEvent(commerce: EventEntity, commerceId: string): Promise<EventEntity>;
  deleteEvent(uid: string): Promise<boolean>;
  findEventById(uid: string): Promise<EventEntity>;
  findEventsByCommerce(commerceId: string, startDate?: Date, finishDate?: Date): Promise<EventEntity[]>;
}
