import { v4 as uuid } from 'uuid';
import { CommerceEntity } from './commerce.entity';

export class CommerceValue implements CommerceEntity {
  id: string;
  nick: string;
  name: string;
  phone: string;
  email: string;
  countryCode: string;
  city: string;
  totalFreePrevent: number;
  isActive: boolean;
  dateFinish: string;

  constructor({
    nick,
    name,
    phone,
    email,
    countryCode,
    city,
    totalFreePrevent,
    isActive,
    dateFinish
  }: {
    nick: string;
    name: string;
    phone: string;
    email: string;
    countryCode: string;
    city: string;
    totalFreePrevent: number;
    isActive: boolean;
    dateFinish: string;
  }) {
    this.id = uuid();
    this.nick = nick;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.countryCode = countryCode;
    this.city = city;
    this.totalFreePrevent = totalFreePrevent;
    this.isActive = isActive;
    this.dateFinish = dateFinish;
  }
}
