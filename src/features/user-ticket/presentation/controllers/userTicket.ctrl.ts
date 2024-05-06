import { Request, Response } from 'express';
import { UserTicketUseCase } from '../../application';

export class UserTicketController {
  constructor(private userTicketUseCase: UserTicketUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.userTicketUseCase.createUserTicket(body);
    res.status(201).send(result);
  };

  public editCtrl = async (req: Request, res: Response) => {
    const result = await this.userTicketUseCase.editUserTicket(req.body);
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { userCommerceUid, eventUid } = req.params;
    const result = await this.userTicketUseCase.findUserTicketByUserAndEvent(
      userCommerceUid,
      eventUid
    );
    res.status(200).send(result);
  };

  public listCtrl = async (req: Request, res: Response) => {
    const { commerceUid, levelUid } = req.params;
    const result =
      await this.userTicketUseCase.getUsersTicketByCommerceAndLevel(
        commerceUid,
        levelUid
      );
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { userTicketUid } = req.params;
    const result = await this.userTicketUseCase.deleteUserTicket(userTicketUid);
    res.status(200).send(result);
  };
}
