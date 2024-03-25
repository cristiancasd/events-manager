import {
  NotFoundError,
  codeUserNotFound,
  errorHandlerUseCase,
  errorMessageUserNotFound,

} from '../../../core';
import { UserEntity } from '../domain/users.entity';
import { UserValue } from '../domain/users.value';
import { UserRepository } from '../domain/users.repository';
import { UserUseCaseInterface } from '../domain/users.useCase';

export class UserUseCase implements UserUseCaseInterface {
  constructor(private readonly _userRepository: UserRepository) { }

  @errorHandlerUseCase
  async validateDuplicatedData(
    commerceId: string,
    document?: number,
    commerceUserId?: string
  ): Promise<boolean> {
    let documentFinded = false;
    let commerceUserIdFinded = false;
    if (document != null) {
      const userFinded = await this._userRepository.findUserByDocument(
        commerceId,
        document.toString()
      );
      documentFinded = userFinded ? true : false;
    }

    if (commerceUserId != null) {

      const userFinded = await this._userRepository.findUserByDocument(
        commerceId,
        commerceUserId
      );
      commerceUserIdFinded = userFinded ? true : false;
    }


    return documentFinded || commerceUserIdFinded ? true : false;
  }

  @errorHandlerUseCase
  async createUser(
    input: UserEntity,
    //commerceId: string,
    //levelUid: string
  ): Promise<UserEntity> {
    const userValue = new UserValue(input);
    return await this._userRepository.createUser(
      userValue,
      //commerceId,
      //levelUid
    );
  }

  @errorHandlerUseCase
  async findUserByUid(uid: string): Promise<UserEntity> {
    return await this._userRepository.findUserByUid(uid);
  }

  @errorHandlerUseCase
  async findUsersByLevelUid(
    commerceId: string,
    levelUid: string
  ): Promise<UserEntity[]> {
    return await this._userRepository.findUsersByLevelUid(commerceId, levelUid);
  }


  @errorHandlerUseCase
  async deleteUserByUid(uid: string): Promise<boolean> {
    const result = await this._userRepository.deleteUser(uid);
    if (result) return result;
    throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);;
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
