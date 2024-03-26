import { LevelEntity } from './level.entity';

export interface LevelUseCaseInterface {
  validateDuplicatedData(
    commerceId: string,
    name?: string,
    typeId?: number
  ): Promise<boolean>;
  createLevel(input: LevelEntity, commerceId: string): Promise<LevelEntity>;
  deleteLevelByUid(uid: string): Promise<boolean>;
  findLevelByUid(uid: string): Promise<LevelEntity>;
  findLevelsByCommerce(commerceId: string): Promise<LevelEntity[]>;
}
