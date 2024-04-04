import {
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

export class UserUseCase implements UserUseCaseInterface {
  constructor(private readonly _userRepository: UserRepository) {}

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceUid: string,
    document?: string,
    commerceUserId?: string
  ): Promise<boolean> {
    let documentFinded = false;
    let commerceUserIdFinded = false;
    if (document != null) {
      try {
        await this._userRepository.findUserByDocument(document);
        documentFinded = true;
      } catch (err) {
        if (!(err instanceof NotFoundError)) {
          throw err;
        }
      }
    }

    if (commerceUserId != null) {
      try {
        await this._userRepository.findUserCommerceByCustomCommerceId(
          commerceUid,
          commerceUserId
        );
        commerceUserIdFinded = true;
      } catch (err) {
        if (!(err instanceof NotFoundError)) {
          throw err;
        }
      }
    }
    return documentFinded || commerceUserIdFinded ? true : false;
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
