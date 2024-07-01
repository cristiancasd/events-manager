import { Request, Response } from 'express';
import { ProspectTicketUseCase } from '../../application';

export class ProspectTicketController {
  constructor(private prospectTicketUseCase: ProspectTicketUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.prospectTicketUseCase.createProspectTicket(body);
    res.status(201).send(result);
  };

  public editCtrl = async (req: Request, res: Response) => {
    const result = await this.prospectTicketUseCase.editProspectTicket(
      req.body
    );
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { prospectUid, eventUid } = req.params;
    const result =
      await this.prospectTicketUseCase.findProspectTicketByProspectAndEvent(
        prospectUid,
        eventUid
      );
    res.status(200).send(result);
  };

  public listCtrl = async (req: Request, res: Response) => {
    const { commerceUid, eventUid } = req.params;
    const result =
      await this.prospectTicketUseCase.getProspectsTicketByCommerceAndEvent(
        commerceUid,
        eventUid
      );
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { prospectTicketUid } = req.params;
    const result = await this.prospectTicketUseCase.deleteProspectTicket(
      prospectTicketUid
    );
    res.status(200).send(result);
  };
}
