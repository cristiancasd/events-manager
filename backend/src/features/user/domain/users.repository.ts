import { UserCommerceEntity } from './userCommerce.entity';
import { UserCoreEntity } from './userCore.entity';
import { UserEntity } from './users.entity';

export interface UserRepository {
  findUserByDocument(document: string): Promise<UserCoreEntity>;

  findUserByEmail(email: string): Promise<UserCoreEntity>;

  findUserCommerceByCustomCommerceId(
    commerceUid: string,
    customCommerceId: string
  ): Promise<UserCommerceEntity>;

  findUserCommerceByEmail(
    commerceUid: string,
    email: string
  ): Promise<UserCommerceEntity>;

  createUser(user: UserEntity): Promise<UserEntity>;
  editUser(user: UserEntity): Promise<UserEntity>;

  createUserCommerce(user: UserCommerceEntity): Promise<UserCommerceEntity>;
  //editUserCommerce(user: UserCommerceEntity): Promise<UserCommerceEntity>;

  findUserCommerceByUid(uid: string): Promise<UserCommerceEntity>;
  findUsersByLevelUid(
    commerceUid: string,
    levelUid: string
  ): Promise<UserEntity[]>;

  deleteUser(uid: string): Promise<boolean>;
  /*disableUser(uid: string): Promise<boolean>;
  enableUser(uid: string): Promise<boolean>;
  //findUsersByCommerce(commerceUid: string): Promise<UserEntity[]>;*/
}
