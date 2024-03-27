import { AuthEntity } from './auth.entity';

export interface AuthUseCaseInterface {
  signIn(email: string, password: string): Promise<AuthEntity>;
  refreshToken(refreshToken: string): Promise<AuthEntity>;
  validateToken(token: string): Promise<boolean>;
}
