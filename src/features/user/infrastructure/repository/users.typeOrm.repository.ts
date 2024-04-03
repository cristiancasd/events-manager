import {
  NotFoundError,
  errorHandlerTypeOrm,
  ServerError,
  codeCommerceNotFound,
  codeLevelNotFound,
  errorMessageLevelNotFound,
  errorMessageCommerceNotFound,
  errorMessageUserNotFound,
  codeUserNotFound
} from '../../../../core';

import { connectDB } from '../../../../database';
import { UserRepository } from '../../domain/users.repository';
import { UserEntity } from '../../domain/users.entity';
import { UserTypeORMEntity } from '../models/users.dto';
import {
  CommerceRepository,
  CommerceTypeORMEntity,
  CommerceUseCase
} from '../../../commerce';
import {
  LevelRepository,
  LevelTypeORMEntity,
  LevelUseCase
} from '../../../levels';
import { BadRequestError } from '../../../../core/domain/errors/bad-request-error';

import * as bcrypt from 'bcrypt';
import { UserCommerceTypeORMEntity } from '../models/userCommerce.dto';
import { UserValue } from '../../domain/users.value';
import { buildUserEntityUtil, buildUserEntityFromUserUtil, buildUserEntityFromUserCommerceUtil } from './utils/user.infrastructure.utils';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    private commerceUseCase: CommerceUseCase,
    private levelUseCase: LevelUseCase
  ) { }

  @errorHandlerTypeOrm
  async findUserByDocument(
    commerceUid: string,
    document: string
  ): Promise<UserEntity | null> {

    const commerce = await this.commerceUseCase.findComerceByUid(commerceUid);
    if (!commerce) throw new BadRequestError(errorMessageCommerceNotFound, codeCommerceNotFound);

    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const user = await userRepository.findOneBy({ document: document });
    const userFindedEntity= await buildUserEntityFromUserUtil(user);
    if(userFindedEntity && userFindedEntity.commerceUid==commerceUid){
      return userFindedEntity;
    }else{
      return null;
    }

  }

  @errorHandlerTypeOrm
  async findUserByCustomCommerceId(
    commerceUid: string,
    customCommerceId: string
  ): Promise<UserEntity | null> {

    const commerce = await this.commerceUseCase.findComerceByUid(commerceUid);
    if (!commerce) throw new BadRequestError(errorMessageCommerceNotFound, codeCommerceNotFound);
    const userCommerceRepository = connectDB.getRepository(UserCommerceTypeORMEntity);
    const user = await userCommerceRepository.findOneBy({ commerceUserId: customCommerceId });

    const userFindedEntity= await buildUserEntityFromUserCommerceUtil(user);

    if(userFindedEntity && userFindedEntity.commerceUid==commerceUid){
      return userFindedEntity;
    }else{
      return null;
    }
  }

  @errorHandlerTypeOrm
  async createUser(data: UserEntity): Promise<UserEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const userCommerceRepository = connectDB.getRepository(UserCommerceTypeORMEntity);

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const level = await this.levelUseCase.findLevelByUid(data.levelUid);

    if (level == null || (level != null && level.commerceUid != commerce.id))
      throw new BadRequestError(errorMessageLevelNotFound, codeLevelNotFound);
    if (data.password == null) throw new BadRequestError('');

    
    // Create users DB
    const newUser= userRepository.create(data);
    const newUserCommerce = userCommerceRepository.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10)
    });

    // Save on DB
    const user = await userRepository.save(newUser);
    const userCommerce: UserCommerceTypeORMEntity = await userCommerceRepository.save({
      ...newUserCommerce,
      commerce: commerce,
      level: level
    });

    return await buildUserEntityUtil(user, userCommerce); 
  }

  //TODO: review whic userUID use
  @errorHandlerTypeOrm
  async findUserByUid(uid: string): Promise<UserEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);

    const user = await userRepository.findOneBy({ id: uid });
    const userCompleteData = await buildUserEntityFromUserUtil(user);

    if (userCompleteData) {
      return userCompleteData;
    }
    throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);
  }

  @errorHandlerTypeOrm
  async findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]> {
    const userCommerceRepository = connectDB.getRepository(UserCommerceTypeORMEntity);

    const queryBuilder = userCommerceRepository
      .createQueryBuilder('userCommerce')
      .leftJoinAndSelect('userCommerce.commerce', 'commerce')
      .where('userCommerce.commerce.id = :commerceUid', { commerceUid })
      .andWhere('userCommerce.level.id = :levelUid', { levelUid });

    const users = await queryBuilder.getMany();
    let userArray: UserEntity[] = [];

    for (const data of users) {
      const user = await buildUserEntityFromUserCommerceUtil(data);
      if (user) {
        userArray.push(user);
      }
    }
    return userArray;
  }

  @errorHandlerTypeOrm
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

  /*@errorHandlerTypeOrm
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

  

  */
}
