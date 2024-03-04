import {
  NotFoundError,
  errorHandlerTypeOrm,
  ServerError,
  codeCommerceNotFound,
  codeLevelNotFound
} from '../../../../core';

import { connectDB } from '../../../../database';
import { UserRepository } from '../../domain/users.repository';
import { UserEntity } from '../../domain/users.entity';
import { UserTypeORMEntity } from '../models/users.dto';
import { CommerceTypeORMEntity } from '../../../commerce';
import { LevelTypeORMEntity } from '../../../levels';

export class TypeOrmUserRepository implements UserRepository {
  @errorHandlerTypeOrm
  async findUserByDocument(
    commerceId: string,
    document: string
  ): Promise<UserEntity | null> {

    console.log('findUserByDocument repository')
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const documentNumber = isNaN(Number(document)) ? 0 : Number(document);

    console.log('documentNumber*--', documentNumber)
    const queryBuilder = userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.level', 'level')
      .where('user.commerce.id = :commerceId', { commerceId })
      .andWhere(
        //'(user.commerceUserId = :document )',
        '(user.commerceUserId = :document OR user.document = :documentNumber)',
        //'(user.commerceUserId = :documentNumber OR user.document = :document)',
        {
          document, documentNumber
        }
      )


    console.log('get one')

    const user = await queryBuilder.getOne();
    console.log(user?.level);
    console.log(user);
    if (user) return { ...user, commerceId, levelId: user.level.id };
    return null;
  }

  @errorHandlerTypeOrm
  async createUser(
    data: UserEntity,
    //commerceId: string,
    //levelUid: string
  ): Promise<UserEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const commerceRepository = connectDB.getRepository(CommerceTypeORMEntity);
    const levelRepository = connectDB.getRepository(LevelTypeORMEntity);

    const newUser = userRepository.create({
      ...data,
      password: 'adsad'
    });
    console.log('-------99999999999');
    console.log(newUser)
    const commerce = await commerceRepository.findOneBy({ id: data.commerceId });
    const level = await levelRepository.findOneBy({ id: data.levelId });

    if (commerce != null) {
      if (level != null) {
        console.log('***************************');
        const algo = await userRepository.save({ ...newUser, commerce: commerce, level: level });
        console.log(algo);
        console.log('-----------44444444444444')
        const toSave = { ...newUser, commerceId: commerce.id, levelId: data.levelId }
        console.log(toSave);
        console.log('***************************');

        return toSave;

      }
      throw new ServerError(codeLevelNotFound);

    }
    throw new ServerError(codeCommerceNotFound);
  }

  /*@errorHandlerTypeOrm
  async deleteUser(uid: string): Promise<boolean> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const userToDelete = await userRepository.findOneBy({ id: uid });
    if (userToDelete) {
      const deleteResponse = await userRepository.remove(userToDelete);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async disableUser(uid: string): Promise<boolean> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);

    const user = await userRepository.findOneBy({ id: uid });

    if (user) {
      user.isActive = false;
      const disabledUser = await userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async enableUser(uid: string): Promise<boolean> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);

    const user = await userRepository.findOneBy({ id: uid });

    if (user) {
      user.isActive = true;
      const disabledCommerce = await userRepository.save(user);
      return true;
      // ...
    } else {
      return false;
    }
  }

  @errorHandlerTypeOrm
  async findUserByUid(uid: string): Promise<UserEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const user = await userRepository.findOneBy({ id: uid });
    if (user) {
      const { commerce, level, ...resto } = user;
      return { ...resto, commerceId: user.commerce.id, levelId: user.level.id };
    }

    throw new NotFoundError();
  }

  @errorHandlerTypeOrm
  async findUsersByLevelUid(
    commerceId: string,
    levelUid: string
  ): Promise<UserEntity[]> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);

    const queryBuilder = userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.commerce', 'commerce') // Carga la relación commerce
      .where('user.commerce.id = :commerceId', { commerceId })
      .andWhere('user.level.id = :levelUid', { levelUid });

    const users = await queryBuilder.getMany();
    return users.map((data) => {
      const { commerce, level, ...resto } = data;
      return {
        ...resto,
        commerceId: data.commerce?.id ?? '',
        levelId: data.level?.id ?? ''
      };
    });
  }*/
}
