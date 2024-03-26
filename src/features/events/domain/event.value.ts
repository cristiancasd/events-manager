import { v4 as uuid } from 'uuid';
import { EventEntity } from './event.entity';

export class EventValue implements EventEntity {
  id: string;
  name: string;
  description?: string;
  date: Date;
  url?: string;
  commerceId: string;

  constructor({
    name,
    description,
    date,
    url,
    commerceId
  }: {
    name: string;
    description?: string;
    date: Date;
    url?: string;
    commerceId: string;
  }) {
    this.id = uuid();
    this.name = name;
    this.description = description;
    this.date = date;
    this.url = url;
    this.commerceId = commerceId;
  }
}
