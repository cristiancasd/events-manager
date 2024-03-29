import { AuthEntity } from "./auth.entity";
import { UserAuthEntity } from "./userAuth.entity";

export interface AuthRepository {
  validateCredentials(email: string, password: string): Promise<UserAuthEntity>;
  generateToken(userAuthInfo: UserAuthEntity): Promise<AuthEntity>;
  refreshToken(refreshToken: string): Promise<AuthEntity>;
  validateToken(token: string): Promise<boolean>;
  getTokenData(token: string): Promise<UserAuthEntity>;
}
