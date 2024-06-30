import { Request, Response } from 'express';
import { AttendeesUserUseCase } from '../../application/attendeesUser.useCase';

export class AttendeesUserController {
  constructor(private attendeesUserUseCase: AttendeesUserUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const { eventUid, userCommerceUid } = req.body;

    const result = await this.attendeesUserUseCase.registerAttendeeUser(
      eventUid,
      userCommerceUid
    );
    res.status(201).send(result);
  };
  public findAttendeesCtrl = async (req: Request, res: Response) => {
    const { eventUid } = req.params;
    const { levelUid } = req.query;

    const levelUidToFind = (levelUid as string) || '';

    const result =
      levelUidToFind == ''
        ? await this.attendeesUserUseCase.getAttendeesUserByEvent(eventUid)
        : await this.attendeesUserUseCase.getAttendeesUserByEventAndLevelUid(
            eventUid,
            levelUidToFind
          );
    res.status(200).send(result);
  };
}
