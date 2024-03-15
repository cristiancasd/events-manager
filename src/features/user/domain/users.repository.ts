import { UserEntity } from './users.entity';

export interface UserRepository {
  findUserByDocument(
    commerceId: string,
    document: string
  ): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
  findUserByUid(uid: string): Promise<UserEntity>;

  /*
  deleteUser(uid: string): Promise<boolean>;
  disableUser(uid: string): Promise<boolean>;
  enableUser(uid: string): Promise<boolean>;
  findUsersByLevelUid(
    commerceId: string,
    levelUid: string
  ): Promise<UserEntity[]>;
  //findUsersByCommerce(commerceId: string): Promise<UserEntity[]>;*/
}
