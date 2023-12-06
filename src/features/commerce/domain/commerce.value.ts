import { v4 as uuid } from 'uuid';
import { CommerceEntity } from './commerce.entity';

export class CommerceValue implements CommerceEntity {
  id: string;
  name: string;
  phone: number;
  email: string;
  countryCode: string;
  city: string;
  totalFreePrevent: number;
  isActive: boolean;
  dateFinish: string;

  constructor({
    name,
    phone,
    email,
    countryCode,
    city,
    totalFreePrevent,
    isActive,
    dateFinish,
  }: {
    name: string;
    phone: number;
    email: string;
    countryCode: string;
    city: string;
    totalFreePrevent: number;
    isActive: boolean;
    dateFinish: string;
  }) {
    this.id = uuid();
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
