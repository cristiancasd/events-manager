import { UserAuthEntity } from './userAuth.entity';

export class UserAuthValue implements UserAuthEntity {
  role: string;
  isActive: boolean;
  userUid: string;
  

  constructor({
    role,
    isActive,
    userUid,
  }: {
    role: string;
    isActive: boolean;
    userUid: string;
  }) {
    this.role = role;
    this.isActive = isActive;
    this.userUid= userUid;
  }

  toJSON(): UserAuthEntity {
    return {
      role: this.role,
      isActive: this.isActive,
      userUid: this.userUid,
    };
  }
}
