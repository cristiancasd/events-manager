import { LevelEntity } from "./level.entity";

export interface LevelRepository {
  findLevelByName(commerceId: string, name: string): Promise<LevelEntity | null>;
  findLevelByTypeId(commerceId: string, typeId: number): Promise<LevelEntity | null>;
  createLevel(level: LevelEntity): Promise<LevelEntity>;
  deleteLevel(uid: string): Promise<boolean>;
  findLevelByUid(uid: string): Promise<LevelEntity>;
  findLevelsByCommerce(commerceId: string): Promise<LevelEntity[]>;
}
