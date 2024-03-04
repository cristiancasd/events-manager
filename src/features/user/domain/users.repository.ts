import { UserEntity } from './users.entity';

export interface UserRepository {
  findUserByDocument(
    commerceId: string,
    document: string
  ): Promise<UserEntity | null>;
  createUser(
    user: UserEntity,
    //commerceId: string,
    //levelUid: string
  ): Promise<UserEntity>;
  /*
  deleteUser(uid: string): Promise<boolean>;
  disableUser(uid: string): Promise<boolean>;
  enableUser(uid: string): Promise<boolean>;
  findUserByUid(uid: string): Promise<UserEntity>;
  findUsersByLevelUid(
    commerceId: string,
    levelUid: string
  ): Promise<UserEntity[]>;
  //findUsersByCommerce(commerceId: string): Promise<UserEntity[]>;*/
}
