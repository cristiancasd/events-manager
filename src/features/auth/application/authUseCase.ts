import { BadRequestError, codeInvalidToken, errorHandlerUseCase, invalidTokenMessage } from "../../../core";
import { AuthEntity } from "../domain/auth.entity";
import { AuthRepository } from "../domain/auth.repository";
import { AuthUseCaseInterface } from "../domain/auth.useCase";

export class AuthUseCase implements AuthUseCaseInterface {
  constructor(private readonly _authRepository: AuthRepository) { }

  @errorHandlerUseCase
  async signIn(email: string, password: string): Promise<AuthEntity> {
    const userAuthData = await this._authRepository.validateCredentials(email, password);
    return await this._authRepository.generateToken(userAuthData);
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
}
