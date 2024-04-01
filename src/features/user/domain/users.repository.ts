import { UserEntity } from './users.entity';

export interface UserRepository {
  findUserByDocument(
    commerceUid: string,
    document: string
  ): Promise<UserEntity | null>;

  findUserByCustomCommerceId(
    commerceUid: string,
    customCommerceId: string
  ): Promise<UserEntity | null>;

  findUserByCustomCommerceId(
    commerceUid: string,
    customCommerceId: string
  ): Promise<UserEntity | null>;

  createUser(user: UserEntity): Promise<UserEntity>;
  findUserByUid(uid: string): Promise<UserEntity>;
  findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]>;

  deleteUser(uid: string): Promise<boolean>;
  /*disableUser(uid: string): Promise<boolean>;
  enableUser(uid: string): Promise<boolean>;
  //findUsersByCommerce(commerceUid: string): Promise<UserEntity[]>;*/
}
