import {
  CriteriaOptionsStatus,
  NotFoundError,
  OptionsValidations,
  codeLevelNotFound,
  errorHandlerUseCase,
  errorMessageLevelNotFound
} from '../../../core';
import { LevelEntity } from '../domain/level.entity';
import { LevelValue } from '../domain/level.value';
import { LevelRepository } from '../domain/level.repository';
import { LevelUseCaseInterface } from '../domain/level.useCase';

export class LevelUseCase implements LevelUseCaseInterface {
  constructor(private readonly _levelRepository: LevelRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceUid: string,
    name?: string,
    typeId?: number
  ): Promise<boolean> {
    let nameFound = false;
    let typeIdFound = false;
    if (name != null) {
      const levelFound = await this._levelRepository.findLevelByName(
        commerceUid,
        name
      );
      nameFound = levelFound ? true : false;
    }

    /*if (typeId != null) {
      const levelFound = await this._levelRepository.findLevelByTypeId(
        commerceUid,
        typeId
      );
      typeIdFound = levelFound ? true : false;
    }*/
    return nameFound || typeIdFound ? true : false;
  }

  @errorHandlerUseCase
  async createLevel(input: LevelEntity): Promise<LevelEntity> {
    const levelValue = new LevelValue(input);
    return await this._levelRepository.createLevel(levelValue);
  }

  @errorHandlerUseCase
  async deleteLevelByUid(uid: string): Promise<boolean> {
    const result = await this._levelRepository.deleteLevel(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageLevelNotFound, codeLevelNotFound);
  }

  @errorHandlerUseCase
  async findLevelByUid(uid: string): Promise<LevelEntity> {
    return await this._levelRepository.findLevelByUid(uid);
  }

  @errorHandlerUseCase
  async findLevelsByCommerce(
    commerceUid: string,
    startDate?: string,
    finishDate?: string
  ): Promise<LevelEntity[]> {
    let startDateTime = startDate ? new Date(startDate) : undefined;
    let finishDateTime = finishDate ? new Date(finishDate) : undefined;

    if ((startDateTime && isNaN(startDateTime.getTime())) || !startDateTime)
      startDateTime = undefined;

    if ((finishDateTime && isNaN(finishDateTime.getTime())) || !finishDateTime)
      finishDateTime = undefined;

    return await this._levelRepository.findLevelsByCommerce(commerceUid);
  }
}
