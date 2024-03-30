import { Request, Response } from 'express';
import { AuthUseCase } from '../../application/authUseCase';

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  public signInCtrl = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const authData = await this.authUseCase.signIn(email, password);
    res.status(200).send(authData);
  };

  public refreshTokenCtrl = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const authData = await this.authUseCase.refreshToken(refreshToken);
    res.status(200).send(authData);
  };

  public validateTokenCtrl = async (req: Request, res: Response) => {
    const token = req.headers['authorization'];
    const authData = await this.authUseCase.validateToken(token ?? '');
    res.status(200).send(authData);
  };
}
