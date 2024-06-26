import { Request, Response } from 'express';
import { UserUseCase } from '../../application/usersUseCase';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await this.userUseCase.createUser(body);
    res.status(201).send(user);
  };

  public editCtrl = async (req: Request, res: Response) => {
    console.log('estoy en editar controller ');
    const body = req.body;
    const user = await this.userUseCase.editUser(body);
    res.status(201).send(user);
  };

  public insertUserCommerceCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const user = await this.userUseCase.createUserCommerce(body);
    res.status(201).send(user);
  };

  public meCtrl = async (req: Request, res: Response) => {
    const token = req.headers['authorization'];
    const result = await this.userUseCase.meDataByUid(token ?? '');
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await this.userUseCase.findUserByUid(userId);
    res.status(200).send(result);
  };

  public findUserCommerceByEmailCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const { email } = req.query;
    const emailToFind = (email as string) || '';

    const result = await this.userUseCase.findUserCommerceByEmail(
      commerceUid,
      emailToFind
    );
    res.status(200).send(result);
  };

  public findUserByDocumentOrCustomIdCtrl = async (
    req: Request,
    res: Response
  ) => {
    const { commerceUid } = req.params;
    const { data } = req.query;
    const input = (data as string) || '';

    const result = await this.userUseCase.findUserByDocumentOrCustomId(
      commerceUid,
      input
    );
    res.status(200).send(result);
  };

  public findUserByLevelCtrl = async (req: Request, res: Response) => {
    const { commerceUid, levelUid } = req.params;
    const result = await this.userUseCase.findUsersByLevelUid(
      commerceUid,
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
