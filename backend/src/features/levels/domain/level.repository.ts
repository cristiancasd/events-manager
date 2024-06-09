import { LevelEntity } from './level.entity';

export interface LevelRepository {
  findLevelByName(
    commerceUid: string,
    name: string
  ): Promise<LevelEntity | null>;
  findLevelByTypeId(
    commerceUid: string,
    typeId: number
  ): Promise<LevelEntity | null>;
  createLevel(level: LevelEntity): Promise<LevelEntity>;
  editLevel(data: LevelEntity): Promise<LevelEntity>;

  deleteLevel(uid: string): Promise<boolean>;
  findLevelByUid(uid: string): Promise<LevelEntity>;
  findLevelsByCommerce(commerceUid: string): Promise<LevelEntity[]>;
}
