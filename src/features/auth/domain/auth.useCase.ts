import { AuthEntity } from './auth.entity';
import { UserAuthEntity } from './userAuth.entity';

export interface AuthUseCaseInterface {
  signIn(email: string, password: string): Promise<AuthEntity>;
  refreshToken(refreshToken: string): Promise<AuthEntity>;
  validateToken(token: string): Promise<boolean>;
  getTokenData(token: string): Promise<UserAuthEntity>;
}
