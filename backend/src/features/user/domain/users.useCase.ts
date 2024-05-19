import { UserCommerceEntity } from './userCommerce.entity';
import { UserEntity } from './users.entity';

export interface UserUseCaseInterface {
  validateDuplicatedData(
    commerceUid: string,
    document?: string,
    commerceUserId?: string
  ): Promise<boolean>;

  findUserByDocumentOrCustomId(
    commerceUid: string,
    document: string
  ): Promise<UserEntity>;

  createUser(
    user: UserEntity
    //commerceUid: string,
    //levelUid: string
  ): Promise<UserEntity>;

  createUserCommerce(user: UserCommerceEntity): Promise<UserEntity>;

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
