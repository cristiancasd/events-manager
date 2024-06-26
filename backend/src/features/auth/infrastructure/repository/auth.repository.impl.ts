import {
  NotFoundError,
  errorHandlerTypeOrm,
  errorMessageUserNotFound,
  codeUserNotFound,
  UnauthorizedError,
  badCredentialsMessage
} from '../../../../core';

import { connectDB } from '../../../../database';

import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../domain/auth.repository';
import { AuthEntity } from '../../domain/auth.entity';
import { UserTypeORMEntity } from '../../../user';
import { UserAuthEntity } from '../../domain/userAuth.entity';
import { UserAuthValue } from '../../domain/userAuth.value';
import { UserValue } from '../../../user/domain/users.value';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthValue } from '../../domain/auth.value';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private tokenSecretKey: string = process.env.TOKEN_SECRET_KEY || '',
    private refreshTokenSecretKey: string = process.env
      .REFRESH_TOKEN_SECRET_KEY || ''
  ) {}

  @errorHandlerTypeOrm
  async getTokenData(token: string): Promise<UserAuthEntity> {
    const decodedToken = jwt.verify(token, this.tokenSecretKey) as JwtPayload;

    return new UserAuthValue({
      userUid: decodedToken.id,
      role: decodedToken.role,
      isActive: decodedToken.isActive,
      commerceUid: decodedToken.commerceUid
    });
  }

  @errorHandlerTypeOrm
  async validateCredentials(
    email: string,
    password: string,
    nick: string
  ): Promise<UserAuthEntity> {
    const userCommerceRepository = connectDB.getRepository(
      UserCommerceTypeORMEntity
    );
    const userRepository = connectDB.getRepository(UserTypeORMEntity);

    const userCommerce = await userCommerceRepository.find({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        role: true,
        isActive: true
      }
    });

    const userFound = userCommerce.find(
      (user) =>
        user.commerce.nick.toLocaleLowerCase() == nick.toLocaleLowerCase()
    );

    if (!userFound)
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);

    if (bcrypt.compareSync(password, userFound.password)) {
      const user = await userRepository.findOne({
        where: { email: userFound.email }
      });

      if (user) {
        const userEntity = new UserValue({
          id: userFound.id,
          name: user.name,
          document: user.document,
          email: user.email,
          phone: user.phone,
          role: userFound.role,
          isActive: userFound.isActive,
          commerceUserId: userFound.commerceUserId,
          commerceUid: userFound.commerce.id,
          levelUid: userFound.level.id
        });

        return new UserAuthValue({
          userUid: userEntity.id,
          role: userEntity.role,
          isActive: userEntity.isActive,
          commerceUid: userEntity.commerceUid
        });
      }
      throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);
    }
    throw new UnauthorizedError(badCredentialsMessage);
  }

  @errorHandlerTypeOrm
  async generateToken(userAuthInfo: UserAuthEntity): Promise<AuthEntity> {
    const userAuthInfoPlainObject = new UserAuthValue(userAuthInfo).toJSON();

    const token = jwt.sign(userAuthInfoPlainObject, this.tokenSecretKey, {
      expiresIn: '24h'
    });
    const refreshToken = jwt.sign(
      userAuthInfoPlainObject,
      this.refreshTokenSecretKey,
      { expiresIn: '7d' }
    );
    return new AuthValue({
      token: token,
      refreshToken: refreshToken
    });
  }

  @errorHandlerTypeOrm
  async refreshToken(refreshToken: string): Promise<AuthEntity> {
    const decoded: JwtPayload = jwt.verify(
      refreshToken,
      this.refreshTokenSecretKey
    ) as JwtPayload;
    const userTokenData = new UserAuthValue({
      isActive: decoded.isActive,
      role: decoded.role,
      userUid: decoded.userUid,
      commerceUid: decoded.commerceUid
    });
    return await this.generateToken(userTokenData);
  }

  @errorHandlerTypeOrm
  async validateToken(token: string): Promise<boolean> {
    jwt.verify(token, this.tokenSecretKey) as JwtPayload;
    return true;
  }
}
