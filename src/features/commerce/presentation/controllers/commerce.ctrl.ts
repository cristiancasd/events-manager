import { Request, Response } from 'express';
import { CriteriaOptionsLocation, CriteriaOptionsStatus } from '../../../../core';
import { CommerceUseCase } from '../../application';
import { LocationEntity } from '../../domain';

export class CommerceController {
  constructor(
    private commerceUseCase: CommerceUseCase,
  ) { }

  public insertCtrl = async ({ body }: Request, res: Response) => {
    const commerce = await this.commerceUseCase.createCommerce(body);
    res.status(201).send(commerce);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { idCommerce } = req.params;
    const result = await this.commerceUseCase.deleteCommerceByUid(idCommerce);
    res.status(200).send(result);
  };

  public disableCtrl = async (req: Request, res: Response) => {
    const { idCommerce } = req.params;
    const result = await this.commerceUseCase.disableCommerceByUid(idCommerce);
    res.status(200).send(result);
  };

  public enableCtrl = async (req: Request, res: Response) => {
    const { idCommerce } = req.params;
    const result = await this.commerceUseCase.enableCommerceByUid(idCommerce);
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { idCommerce } = req.params;
    const result = await this.commerceUseCase.findComerceByUid(idCommerce);
    res.status(200).send(result);
  };

  public findByCriteriaCtrl = async (req: Request, res: Response) => {
    const { statusQ, locationTypeQ, locationQ } = req.query;


    // Check if statusQ is a valid key in CriteriaOptionsStatus
    const status: CriteriaOptionsStatus | undefined = Object.values(CriteriaOptionsStatus).includes(statusQ as CriteriaOptionsStatus)
      ? CriteriaOptionsStatus[statusQ as CriteriaOptionsStatus]
      : undefined;

    const locationType: CriteriaOptionsLocation | undefined = Object.values(CriteriaOptionsLocation).includes(locationTypeQ as CriteriaOptionsLocation)
      ? CriteriaOptionsLocation[locationTypeQ as CriteriaOptionsLocation]
      : undefined;

    let location: LocationEntity | undefined =
      locationType && typeof locationQ === "string" && locationQ != ''
        ? {
          name: locationQ,
          type: locationType
        }
        : undefined;

    const result = await this.commerceUseCase.findCommerces(status, location);
    res.status(200).send(result);
  };
}
