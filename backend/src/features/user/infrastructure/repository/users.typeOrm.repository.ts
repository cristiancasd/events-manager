import {
  NotFoundError,
  errorHandlerTypeOrm,
  ServerError,
  codeCommerceNotFound,
  codeLevelNotFound,
  errorMessageLevelNotFound,
  errorMessageCommerceNotFound,
  errorMessageUserNotFound,
  codeUserNotFound,
  DataBaseError,
  errorMessageUserCoreNotFound,
  codeUserCoreNotFound
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
import {
  buildUserEntityUtil,
  buildUserEntityFromUserCommerceUtil
} from './utils/user.infrastructure.utils';
import { UserCoreEntity } from '../../domain/userCore.entity';
import { UserCommerceEntity } from '../../domain/userCommerce.entity';
import { UserCommerceValue } from '../../domain/userCommerce.value';
import { AuthUseCase } from '../../../auth';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    private commerceUseCase: CommerceUseCase,
    private levelUseCase: LevelUseCase
  ) {}

  @errorHandlerTypeOrm
  async findUserByDocument(document: string): Promise<UserCoreEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const user = await userRepository.findOneBy({ document: document });

    if (!user)
      throw new NotFoundError(
        errorMessageUserCoreNotFound,
        codeUserCoreNotFound
      );
    return user;
  }

  @errorHandlerTypeOrm
  async findUserByEmail(email: string): Promise<UserCoreEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const user = await userRepository.findOneBy({
      email: email.toLocaleLowerCase()
    });

    if (!user)
      throw new NotFoundError(
        errorMessageUserCoreNotFound,
        codeUserCoreNotFound
      );
    return user;
  }

  @errorHandlerTypeOrm
  async findUserCommerceByCustomCommerceId(
    commerceUid: string,
    customCommerceId: string
  ): Promise<UserCommerceEntity> {
    const commerce = await this.commerceUseCase.findComerceByUid(commerceUid);
    if (!commerce)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );
    const commerceUserId = customCommerceId;
    const queryBuilder = userCommerceRepository
      .createQueryBuilder('userCommerce')
      .leftJoinAndSelect('userCommerce.level', 'level')
      .leftJoinAndSelect('userCommerce.commerce', 'commerce')
      .where('LOWER(userCommerce.commerceUserId) = LOWER(:commerceUserId)', {
        commerceUserId
      });

    const userFound = await queryBuilder.getOne();

    if (!userFound || userFound.commerce.id != commerceUid)
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);
    return {
      ...userFound,
      levelUid: userFound.level.id,
      commerceUid: commerce.id
    };
  }

  @errorHandlerTypeOrm
  async findUserCommerceByEmail(
    commerceUid: string,
    email: string
  ): Promise<UserCommerceEntity> {
    const commerce = await this.commerceUseCase.findComerceByUid(commerceUid);
    if (!commerce)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );
    const userCommerce = await userCommerceRepository.findOneBy({
      email: email
    });
    if (!userCommerce)
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);

    return new UserCommerceValue({
      ...userCommerce,
      levelUid: userCommerce.level.id,
      commerceUid: commerce.id
    });
  }

  @errorHandlerTypeOrm
  async createUser(data: UserEntity): Promise<UserEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const level = await this.levelUseCase.findLevelByUid(data.levelUid);

    if (level == null || (level != null && level.commerceUid != commerce.id))
      throw new BadRequestError(errorMessageLevelNotFound, codeLevelNotFound);
    if (data.password == null) throw new BadRequestError('');

    const { id, ...resto } = data;

    // Create users DB
    const newUser = userRepository.create(resto);
    const user = await userRepository.save(newUser);

    const newUserCommerce = userCommerceRepository.create({
      ...resto,
      //...data,
      password: bcrypt.hashSync(data.password, 10),
      level,
      commerce,
      user
    });

    // Save on DB

    const userCommerce: UserCommerceTypeORMEntity =
      await userCommerceRepository.save({
        ...newUserCommerce,
        commerce: commerce,
        level: level
      });

    return await buildUserEntityUtil(user, userCommerce);
  }

  @errorHandlerTypeOrm
  async editUser(data: UserEntity): Promise<UserEntity> {
    console.log('estoy en repository editUser');
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );

    const userCommerceFound = await userCommerceRepository.findOneBy({
      id: data.id
    });
    if (!userCommerceFound)
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const level = await this.levelUseCase.findLevelByUid(data.levelUid);

    if (level == null || (level != null && level.commerceUid != commerce.id))
      throw new BadRequestError(errorMessageLevelNotFound, codeLevelNotFound);

    // Create users DB
    //const user = userRepository.create(resto);

    const userCoreFound = userCommerceFound.user;

    const { password, ...restoUserCommerceFound } = userCommerceFound;
    console.log(
      '*******************************************++++data.password',
      data.password
    );
    const newUserCommerce = data.password
      ? await userCommerceRepository.save({
          ...userCommerceFound,
          ...data,
          password: bcrypt.hashSync(data.password, 10),
          level,
          commerce
          //user: userCoreFound,
        })
      : await userCommerceRepository.save({
          ...restoUserCommerceFound,
          ...data,
          level,
          commerce
          // user: userCoreFound,
        });

    const { id, ...resto } = data;

    const newUser = await userRepository.save({
      ...userCoreFound,
      ...resto
    });

    return await buildUserEntityUtil(newUser, newUserCommerce);
  }

  @errorHandlerTypeOrm
  async createUserCommerce(
    data: UserCommerceEntity
  ): Promise<UserCommerceEntity> {
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );

    const user = await this.findUserByEmail(data.email);

    const commerce = await this.commerceUseCase.findComerceByUid(
      data.commerceUid
    );

    const level = await this.levelUseCase.findLevelByUid(data.levelUid);

    if (level == null || (level != null && level.commerceUid != commerce.id))
      throw new BadRequestError(errorMessageLevelNotFound, codeLevelNotFound);
    if (data.password == null) throw new BadRequestError('');

    // Create users DB
    const newUserCommerce = userCommerceRepository.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
      commerce,
      level,
      user
    });

    // Save on DB
    const userCommerce: UserCommerceTypeORMEntity =
      await userCommerceRepository.save({
        ...newUserCommerce,
        commerce: commerce,
        level: level,
        user: user
      });

    return new UserCommerceValue({
      ...userCommerce,
      levelUid: userCommerce.level.id,
      commerceUid: userCommerce.commerce.id
    });
  }

  //TODO: review whic userUID use
  @errorHandlerTypeOrm
  async findUserCommerceByUid(uid: string): Promise<UserCommerceEntity> {
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );

    const userCommerce = await userCommerceRepository.findOneBy({ id: uid });
    if (!userCommerce)
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);

    return new UserCommerceValue({
      ...userCommerce,
      levelUid: userCommerce.level.id,
      commerceUid: userCommerce.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]> {
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );

    console.log('prueba... findUsersByLevelUid');

    const queryBuilder = userCommerceRepository
      .createQueryBuilder('userCommerce')
      .leftJoinAndSelect('userCommerce.commerce', 'commerce')
      .leftJoinAndSelect('userCommerce.level', 'level')
      .where('userCommerce.commerce.id = :commerceUid', { commerceUid })
      .andWhere('userCommerce.level.id = :levelUid', { levelUid });
    console.log('prueba... ');

    const users = await queryBuilder.getMany();
    let userArray: UserEntity[] = [];

    for (const data of users) {
      const user = await buildUserEntityFromUserCommerceUtil(data);
      if (user) {
        userArray.push(user);
      }
    }
    console.log('prueba... userArray', userArray);

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
