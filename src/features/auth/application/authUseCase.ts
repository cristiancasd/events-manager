import {
  BadRequestError,
  codeInvalidToken,
  errorHandlerUseCase,
  invalidTokenMessage
} from '../../../core';
import { CommerceUserRoles } from '../../../core/shared/constants';
import { UserValue } from '../../user/domain/users.value';
import { AuthEntity } from '../domain/auth.entity';
import { AuthRepository } from '../domain/auth.repository';
import { AuthUseCaseInterface } from '../domain/auth.useCase';
import { UserAuthEntity } from '../domain/userAuth.entity';
import { UserAuthValue } from '../domain/userAuth.value';

export class AuthUseCase implements AuthUseCaseInterface {
  constructor(private readonly _authRepository: AuthRepository) {}

  @errorHandlerUseCase
  async signIn(
    email: string,
    password: string,
    nick: string
  ): Promise<AuthEntity> {
    const masterUser = process.env.MASTER_USER;
    const masterPassword = process.env.MASTER_PASSWORD;

    if (email != masterUser || password != masterPassword) {
      const userAuthData = await this._authRepository.validateCredentials(
        email,
        password,
        nick
      );
      return await this._authRepository.generateToken(userAuthData);
    } else {
      const masterUser = new UserAuthValue({
        userUid: 'masterUser',
        role: CommerceUserRoles.masterAdmin,
        commerceUid: 'masterUser',
        isActive: true
      });
      return await this._authRepository.generateToken(masterUser);
    }
  }

  @errorHandlerUseCase
  async refreshToken(refreshToken: string): Promise<AuthEntity> {
    return await this._authRepository.refreshToken(refreshToken);
  }

  @errorHandlerUseCase
  async validateToken(token: string): Promise<boolean> {
    /*if (!token.startsWith('Bearer ')) {
      throw new BadRequestError(invalidTokenMessage, codeInvalidToken);
    }
    const tokenData = tokenWithBearer.slice(7);*/

    return await this._authRepository.validateToken(token);
  }

  @errorHandlerUseCase
  async getTokenData(token: string): Promise<UserAuthEntity> {
    return await this._authRepository.getTokenData(token);
  }
}
