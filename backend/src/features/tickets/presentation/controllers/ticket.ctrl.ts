import { Request, Response } from 'express';
import { TicketUseCase } from '../../application';

export class TicketController {
  constructor(private TicketUseCase: TicketUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.TicketUseCase.createTicket(body);
    res.status(201).send(result);
  };

  public listTicketsCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const result = await this.TicketUseCase.getTicketsByCommerce(commerceUid);
    res.status(200).send(result);
  };

  public editTicketCtrl = async (req: Request, res: Response) => {
    const result = await this.TicketUseCase.editTicket(req.body);
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { ticketUid } = req.params;
    const result = await this.TicketUseCase.deleteTicket(ticketUid);
    res.status(200).send(result);
  };
}
