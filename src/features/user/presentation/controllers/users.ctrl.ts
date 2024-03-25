import { Request, Response } from 'express';
import { UserUseCase } from '../../application/usersUseCase';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await this.userUseCase.createUser(
      body,
    );
    res.status(201).send(user);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.userUseCase.findUserByUid(userId);
    res.status(200).send(result);
  };

  public findUserByLevelCtrl = async (req: Request, res: Response) => {
    const { commerceId, levelUid } = req.params;
    const result = await this.userUseCase.findUsersByLevelUid(
      commerceId,
      levelUid
    );
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.userUseCase.deleteUserByUid(userId);
    res.status(200).send(result);
  };

  /*public disableUserByUidCtrl = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.userUseCase.disableUserByUid(userId);
    res.status(200).send(result);
  };

  public enableUserByUidCtrl = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.userUseCase.enableUserByUid(userId);
    res.status(200).send(result);
  };

  

  */
}
