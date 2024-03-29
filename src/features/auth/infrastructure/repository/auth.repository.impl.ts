import {
  NotFoundError,
  errorHandlerTypeOrm,
  errorMessageUserNotFound,
  codeUserNotFound,
  UnauthorizedError
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


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private tokenSecretKey: string = process.env.TOKEN_SECRET_KEY || '',
    private refreshTokenSecretKey: string = process.env.REFRESH_TOKEN_SECRET_KEY || '') { }

  @errorHandlerTypeOrm
  async validateCredentials(
    email: string,
    password: string
  ): Promise<UserAuthEntity> {
    const userRepository = connectDB.getRepository(UserTypeORMEntity);
    const user = await userRepository.findOne({
      where: { email }, select: { email: true, password: true, id: true, role: true, isActive: true },
    })

    if (!user) throw new NotFoundError(errorMessageUserNotFound, codeUserNotFound);

    if (bcrypt.compareSync(password, user.password)) {

      const userEntity = new UserValue({ ...user, commerceId: '', levelUid: '' });
      return new UserAuthValue({
        userUid: userEntity.id,
        role: userEntity.role,
        isActive: userEntity.isActive
      });
    }
    throw new UnauthorizedError;
  }

  @errorHandlerTypeOrm
  async generateToken(
    userAuthInfo: UserAuthEntity,
  ): Promise<AuthEntity> {


    const userAuthInfoPlainObject = new UserAuthValue(userAuthInfo).toJSON();

    const token = jwt.sign(userAuthInfoPlainObject, this.tokenSecretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign(userAuthInfoPlainObject, this.refreshTokenSecretKey, { expiresIn: '7d' });
    return new AuthValue({
      token: token,
      refreshToken: refreshToken,
    })
  }


  @errorHandlerTypeOrm
  async refreshToken(
    refreshToken: string,
  ): Promise<AuthEntity> {


    const decoded: JwtPayload = jwt.verify(refreshToken, this.refreshTokenSecretKey) as JwtPayload;
    const userTokenData = new UserAuthValue({
      isActive: decoded.isActive,
      role: decoded.role,
      userUid: decoded.userUid,
    });
    return await this.generateToken(userTokenData);
  }

  @errorHandlerTypeOrm
  async validateToken(
    token: string,
  ): Promise<boolean> {
    jwt.verify(token, this.tokenSecretKey) as JwtPayload;
    return true;
  }
}
