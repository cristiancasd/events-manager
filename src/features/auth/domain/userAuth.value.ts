import { UserAuthEntity } from './userAuth.entity';

export class UserAuthValue implements UserAuthEntity {
  role: string;
  isActive: boolean;
  userUid: string;
  commerceUid: string;

  constructor({
    role,
    isActive,
    userUid,
    commerceUid
  }: {
    role: string;
    isActive: boolean;
    userUid: string;
    commerceUid: string;
  }) {
    this.role = role;
    this.isActive = isActive;
    this.userUid = userUid;
    this.commerceUid = commerceUid;
  }

  toJSON(): UserAuthEntity {
    return {
      role: this.role,
      isActive: this.isActive,
      userUid: this.userUid,
      commerceUid: this.commerceUid
    };
  }
}
