import { AuthEntity } from './auth.entity';

export class AuthValue implements AuthEntity {
  token: string;
  refreshToken: string;

  constructor({
    token,
    refreshToken
  }: {
    token: string;
    refreshToken: string;
  }) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
