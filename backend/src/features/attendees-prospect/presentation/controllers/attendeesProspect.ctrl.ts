import { Request, Response } from 'express';
import { AttendeesProspectUseCase } from '../../infrastructure';

export class AttendeesProspectController {
  constructor(private attendeesProspectUseCase: AttendeesProspectUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const { eventUid, prospectUid } = req.body;
    const result = await this.attendeesProspectUseCase.registerAttendeeProspect(
      eventUid,
      prospectUid
    );
    res.status(201).send(result);
  };

  public findAttendeesCtrl = async (req: Request, res: Response) => {
    const { eventUid } = req.params;
    const { userCommerceUid } = req.query;

    const userCommerceUidToFind = (userCommerceUid as string) || '';

    const result =
      userCommerceUidToFind == ''
        ? await this.attendeesProspectUseCase.getAttendeesProspectByEvent(
            eventUid
          )
        : await this.attendeesProspectUseCase.getAttendeesProspectByEventAndUserCommerceUid(
            eventUid,
            userCommerceUidToFind
          );
    res.status(200).send(result);
  };
}
