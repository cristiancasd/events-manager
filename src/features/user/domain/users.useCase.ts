import { UserEntity } from './users.entity';

export interface UserUseCaseInterface {
  validateDuplicatedData(
    commerceUid: string,
    document?: string,
    commerceUserId?: string
  ): Promise<boolean>;
  createUser(
    user: UserEntity
    //commerceUid: string,
    //levelUid: string
  ): Promise<UserEntity>;
  findUserByUid(uid: string): Promise<UserEntity>;

  findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]>;

  deleteUserByUid(uid: string): Promise<boolean>;
  /*disableUserByUid(uid: string): Promise<boolean>;
  enableUserByUid(uid: string): Promise<boolean>;
  
  //findUsersByCommerce(commerceUid: string): Promise<UserEntity[]>;*/
}
