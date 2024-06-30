import { LevelEntity } from './level.entity';

export interface LevelUseCaseInterface {
  validateDuplicatedData(
    commerceUid: string,
    id: string | undefined,
    isEditRequest: boolean,
    name?: string,
    typeId?: number
  ): Promise<boolean>;
  createLevel(input: LevelEntity, commerceUid: string): Promise<LevelEntity>;
  editLevel(data: LevelEntity): Promise<LevelEntity>;

  deleteLevelByUid(uid: string): Promise<boolean>;
  findLevelByUid(uid: string): Promise<LevelEntity>;
  findLevelsByCommerce(commerceUid: string): Promise<LevelEntity[]>;
}
