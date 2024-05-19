import {
  NotFoundError,
  errorHandlerTypeOrm,
  codeCommerceNotFound,
  errorMessageLevelNotFound,
  codeLevelNotFound,
  errorMessageCommerceNotFound
} from '../../../../core';

import { connectDB } from '../../../../database';
import { LevelRepository } from '../../domain/level.repository';
import { LevelEntity } from '../../domain/level.entity';
import { LevelTypeORMEntity } from '../models/level.dto';
import { CommerceTypeORMEntity, CommerceUseCase } from '../../../commerce';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';
import { LevelValue } from '../../domain/level.value';

export class TypeOrmLevelRepository implements LevelRepository {
  constructor(private commerceUseCase: CommerceUseCase) {}

  @errorHandlerTypeOrm
  async findLevelByName(
    commerceUid: string,
    name: string
  ): Promise<LevelEntity | null> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);
    const queryBuilder = levelRepository
      .createQueryBuilder('level')
      .where('level.commerce.id = :commerceUid', { commerceUid })
      .andWhere('level.name = :name', { name });
    const level = await queryBuilder.getOne();
    if (level) return { ...level, commerceUid };
    return null;
  }

  @errorHandlerTypeOrm
  async findLevelByTypeId(
    commerceUid: string,
    typeId: number
  ): Promise<LevelEntity | null> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);
    const queryBuilder = levelRepository
      .createQueryBuilder('level')
      .where('level.commerce.id = :commerceUid', { commerceUid })
      .andWhere('level.typeId = :typeId', { typeId });
    const level = await queryBuilder.getOne();
    if (level) return { ...level, commerceUid };
    return null;
  }

  @errorHandlerTypeOrm
  async createLevel(data: LevelEntity): Promise<LevelEntity> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);
    const { id, ...resto } = data;
    const newLevel = levelRepository.create(resto);
    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );
    if (commerce != null) {
      const levelSaved = await levelRepository.save({
        ...newLevel,
        commerce: commerce
      });
      return new LevelValue({
        ...levelSaved,
        commerceUid: commerce.id
      });
    }
    throw new NotFoundError(errorMessageCommerceNotFound, codeCommerceNotFound);
  }

  @errorHandlerTypeOrm
  async deleteLevel(uid: string): Promise<boolean> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);
    const levelToDelete = await levelRepository.findOneBy({ id: uid });
    if (levelToDelete) {
      const deleteResponse = await levelRepository.remove(levelToDelete);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async findLevelByUid(uid: string): Promise<LevelEntity> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);
    const level = await levelRepository.findOneBy({ id: uid });

    if (level) {
      return new LevelValue({
        ...level,
        commerceUid: level.commerce.id
      });
    }
    throw new NotFoundError(errorMessageLevelNotFound, codeLevelNotFound);
  }

  @errorHandlerTypeOrm
  async findLevelsByCommerce(commerceUid: string): Promise<LevelEntity[]> {
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);

    const queryBuilder = levelRepository
      .createQueryBuilder('level')
      .leftJoinAndSelect('level.commerce', 'commerce') // Carga la relación commerce
      .where('level.commerce.id = :commerceUid', { commerceUid });

    const levels = await queryBuilder.getMany();
    return levels.map((data) => {
      const { commerce, ...resto } = data;
      return { ...resto, commerceUid: data.commerce?.id ?? '' };
    });
  }
}
