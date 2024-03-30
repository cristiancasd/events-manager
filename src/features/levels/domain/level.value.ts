import { v4 as uuid } from 'uuid';
import { LevelEntity } from './level.entity';

export class LevelValue implements LevelEntity {
  id: string;
  typeId: number;
  name: string;
  commerceUid: string;

  constructor({
    typeId,
    name,
    commerceUid
  }: {
    typeId: number;
    name: string;
    commerceUid: string;
  }) {
    this.id = uuid();
    this.name = name;
    this.typeId = typeId;
    this.commerceUid = commerceUid;
  }
}
