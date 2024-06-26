import {
  CommerceUserRoles,
  CustomError,
  NotFoundError,
  codeUserNotFound,
  errorHandlerUseCase,
  errorMessageUserNotFound
} from '../../../core';
import { UserEntity } from '../domain/users.entity';
import { UserValue } from '../domain/users.value';
import { UserRepository } from '../domain/users.repository';
import { UserUseCaseInterface } from '../domain/users.useCase';
import { buildUserEntityApplicationUtil } from './utils/user.application.utils';
import { UserCommerceEntity } from '../domain/userCommerce.entity';
import { UserCommerceValue } from '../domain/userCommerce.value';
import { AuthUseCase } from '../../auth';
import { MeEntity } from '../domain/me.entity';
import { CommerceUseCase } from '../../commerce';

export class UserUseCase implements UserUseCaseInterface {
  constructor(
    private readonly _authUseCase: AuthUseCase,
    private readonly _commerceUseCase: CommerceUseCase,
    private readonly _userRepository: UserRepository
  ) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceUid: string,
    isEditRequest: boolean,
    id?: string,
    document?: string,
    commerceUserId?: string
  ): Promise<boolean> {
    console.log('******************* id', id);
    console.log('******************* commerceUserId', commerceUserId);

    let documentFound = false;
    let commerceUserIdFound = false;
    if (document != null) {
      try {
        //user core
        const resultCore = await this._userRepository.findUserByDocument(
          document
        );
        const resultUserCommerce =
          await this._userRepository.findUserCommerceByEmail(
            commerceUid,
            resultCore.email
          );

        console.log(id, resultCore.id, resultUserCommerce.id);
        documentFound = !isEditRequest
          ? true
          : resultUserCommerce.id == id
          ? false
          : true;
        console.log(documentFound);
      } catch (err) {
        if (!(err instanceof NotFoundError)) {
          throw err;
        }
      }
    }

    if (commerceUserId != null) {
      try {
        const result =
          await this._userRepository.findUserCommerceByCustomCommerceId(
            commerceUid,
            commerceUserId
          );
        commerceUserIdFound = !isEditRequest
          ? true
          : result.id == id
          ? false
          : true;
      } catch (err) {
        if (!(err instanceof NotFoundError)) {
          throw err;
        }
      }
    }
    return documentFound || commerceUserIdFound ? true : false;
  }

  @errorHandlerUseCase
  async findUserByDocumentOrCustomId(
    commerceUid: string,
    input: string
  ): Promise<UserEntity> {
    try {
      const userCommerce =
        await this._userRepository.findUserCommerceByCustomCommerceId(
          commerceUid,
          input
        );
      const user = await this._userRepository.findUserByEmail(
        userCommerce.email
      );
      return buildUserEntityApplicationUtil(user, userCommerce);
    } catch (err) {
      if (err instanceof NotFoundError) {
        if (err.code == codeUserNotFound) {
          const user = await this._userRepository.findUserByDocument(input);
          const userCommerce =
            await this._userRepository.findUserCommerceByEmail(
              commerceUid,
              user.email
            );
          return buildUserEntityApplicationUtil(user, userCommerce);
        }
      }
      throw err;
    }
  }

  @errorHandlerUseCase
  async createUser(input: UserEntity): Promise<UserEntity> {
    const userValue = new UserValue(input);
    return await this._userRepository.createUser(userValue);
  }

  @errorHandlerUseCase
  async editUser(input: UserEntity): Promise<UserEntity> {
    console.log('estoy en application editUser');
    console.log('estoy en application editUser input', input);

    const userValue = new UserValue(input);
    console.log('estoy en application editUser userValue', userValue);

    return await this._userRepository.editUser(userValue);
  }

  @errorHandlerUseCase
  async createUserCommerce(input: UserCommerceEntity): Promise<UserEntity> {
    const userCommerceValue = new UserCommerceValue(input);
    const user = await this._userRepository.findUserByEmail(
      userCommerceValue.email
    );

    const userCommerce = await this._userRepository.createUserCommerce(
      userCommerceValue
    );

    return buildUserEntityApplicationUtil(user, userCommerce);
  }

  @errorHandlerUseCase
  async findUserByUid(uid: string): Promise<UserEntity> {
    const userCommerce = await this._userRepository.findUserCommerceByUid(uid);
    const user = await this._userRepository.findUserByEmail(userCommerce.email);
    return buildUserEntityApplicationUtil(user, userCommerce);
  }

  @errorHandlerUseCase
  async meDataByUid(token: string): Promise<MeEntity> {
    const { commerceUid, role, userUid } = await this._authUseCase.getTokenData(
      token
    );

    const meMaster: MeEntity = {
      commerceName: '',
      commerceUid: '',
      role: 'master',
      userName: '',
      userUid: ''
    };

    if (role == CommerceUserRoles.masterAdmin) {
      console.log('is master user');
      return meMaster;
    }
    const userData = await this.findUserByUid(userUid);
    const commerceData = await this._commerceUseCase.findComerceByUid(
      commerceUid
    );

    return {
      userUid: userData.id,
      role: userData.role,
      userName: userData.name,
      commerceUid: commerceData.id,
      commerceName: commerceData.name
    };
  }

  @errorHandlerUseCase
  async findUserCommerceByEmail(
    commerceUid: string,
    email: string
  ): Promise<UserEntity> {
    const userCommerce = await this._userRepository.findUserCommerceByEmail(
      commerceUid,
      email
    );
    const user = await this._userRepository.findUserByEmail(userCommerce.email);
    return buildUserEntityApplicationUtil(user, userCommerce);
  }

  @errorHandlerUseCase
  async findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]> {
    return await this._userRepository.findUsersByLevelUid(
      commerceUid,
      levelUid
    );
  }

  @errorHandlerUseCase
  async deleteUserByUid(uid: string): Promise<boolean> {
    const result = await this._userRepository.deleteUser(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);
  }

  /* @errorHandlerUseCase
  async disableUserByUid(uid: string): Promise<boolean> {
    const result = await this._userRepository.disableUser(uid);
    if (result) return result;
    throw new NotFoundError();
  }
 
  @errorHandlerUseCase
  async enableUserByUid(uid: string): Promise<boolean> {
    const result = await this._userRepository.enableUser(uid);
    if (result) return result;
    throw new NotFoundError();
  }
 
  
  */
}
