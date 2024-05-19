import { v4 as uuid } from 'uuid';
import { EventEntity } from './event.entity';

export class EventValue implements EventEntity {
  id: string;
  name: string;
  description?: string;
  date: Date;
  url?: string;
  commerceUid: string;

  constructor({
    id,
    name,
    description,
    date,
    url,
    commerceUid
  }: {
    id: string;
    name: string;
    description?: string;
    date: Date;
    url?: string;
    commerceUid: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.url = url;
    this.commerceUid = commerceUid;
  }
}
