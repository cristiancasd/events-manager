import { Request, Response } from 'express';
import { TicketProspectFeeUseCaseInterface } from '../../domain';

export class TicketProspectFeeController {
  constructor(
    private TicketProspectFeeUseCase: TicketProspectFeeUseCaseInterface
  ) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.TicketProspectFeeUseCase.createTicket(body);
    res.status(201).send(result);
  };

  public listTicketsCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const result = await this.TicketProspectFeeUseCase.getTicketsByCommerce(
      commerceUid
    );
    res.status(200).send(result);
  };

  public editTicketCtrl = async (req: Request, res: Response) => {
    const result = await this.TicketProspectFeeUseCase.editTicket(req.body);
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { ticketUid } = req.params;
    const result = await this.TicketProspectFeeUseCase.deleteTicket(ticketUid);
    res.status(200).send(result);
  };
}
