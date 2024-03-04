import { UserEntity } from './users.entity';

export interface UserUseCaseInterface {
  validateDuplicatedData(
    commerceId: string,
    document?: number,
    commerceUserId?: string
  ): Promise<boolean>;
  createUser(
    user: UserEntity,
    //commerceId: string,
    //levelUid: string
  ): Promise<UserEntity>;
  /*
  deleteUserByUid(uid: string): Promise<boolean>;
  disableUserByUid(uid: string): Promise<boolean>;
  enableUserByUid(uid: string): Promise<boolean>;
  findUserByUid(uid: string): Promise<UserEntity>;
  findUsersByLevelUid(
    commerceId: string,
    levelUid: string
  ): Promise<UserEntity[]>;
  //findUsersByCommerce(commerceId: string): Promise<UserEntity[]>;*/
}
