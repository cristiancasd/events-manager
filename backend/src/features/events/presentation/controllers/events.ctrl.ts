import { Request, Response } from 'express';
import { EventsUseCase } from '../../application/eventsUseCase';

export class EventsController {
  constructor(private eventsUseCase: EventsUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const event = await this.eventsUseCase.createEvent(body);
    res.status(201).send(event);
  };

  public editCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const event = await this.eventsUseCase.editEvent(body);
    res.status(200).send(event);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const result = await this.eventsUseCase.deleteEventByUid(eventId);
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const result = await this.eventsUseCase.findEventByUid(eventId);
    res.status(200).send(result);
  };

  public findEventsByCommerceCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const { startDate, finishDate } = req.query;
    const result = await this.eventsUseCase.findEventsByCommerce(
      commerceUid,
      startDate as string | undefined,
      finishDate as string | undefined
    );
    res.status(200).send(result);
  };
}
