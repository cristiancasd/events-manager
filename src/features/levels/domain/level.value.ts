import { v4 as uuid } from 'uuid';
import { LevelEntity } from './level.entity';

export class LevelValue implements LevelEntity {
  id: string;
  typeId: number;
  name: string;
  commerceId: string;

  constructor({
    typeId,
    name,
    commerceId
  }: {
    typeId: number;
    name: string;
    commerceId: string;
  }) {
    this.id = uuid();
    this.name = name;
    this.typeId = typeId;
    this.commerceId = commerceId;
  }
}
