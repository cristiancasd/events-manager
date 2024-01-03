import { CriteriaOptionsStatus } from "../../../core";
import { EventEntity } from "./events.entity";


export interface EventRepository {
  createEvent(commerce: EventEntity, commerceId: string): Promise<EventEntity>;
  deleteEvent(uid: string, commerceId: string): Promise<boolean>;
  disableEvent(uid: string, commerceId: string): Promise<boolean>;
  enableEvent(uid: string, commerceId: string): Promise<boolean>;
  findEventById(uid: string, commerceId: string, onlyActive?: boolean): Promise<EventEntity>;
  findEventByCommerce(commerceId: string, status?: CriteriaOptionsStatus, startDate?: Date, finishDate?: Date,): Promise<EventEntity[]>;
}
