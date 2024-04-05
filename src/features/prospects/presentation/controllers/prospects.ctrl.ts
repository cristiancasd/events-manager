import { Request, Response } from 'express';
import { ProspectsUseCase } from '../../application';

export class ProspectsController {
  constructor(private prospectsUseCase: ProspectsUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.prospectsUseCase.createProspect(body);
    res.status(201).send(result);
  };

 
  public findProspectCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const { phone } = req.query;
    const phoneToFind = (phone as string) || '';
    const result = await this.prospectsUseCase.findProspectByPhone(commerceUid, phoneToFind);
    res.status(200).send(result);
  };


  public findProspectsByUserCommerceCtrl = async (req: Request, res: Response) => {
    const { userCommerceUid } = req.params;
    const result = await this.prospectsUseCase.findProspectsByUserCommerce(userCommerceUid);
    res.status(200).send(result);
  };

  public editProspectCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const result = await this.prospectsUseCase.editProspect(body);
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { prospectUid } = req.params;
    const result = await this.prospectsUseCase.deleteProspectByUid(prospectUid);
    res.status(200).send(result);
  };

 }
