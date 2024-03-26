import { Request, Response } from 'express';
import {
  CriteriaOptionsLocation,
  CriteriaOptionsStatus
} from '../../../../core';
import { CommerceUseCase } from '../../application';
import { LocationEntity } from '../../domain';

export class CommerceController {
  constructor(private commerceUseCase: CommerceUseCase) {}

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
    const { status, locationType, location } = req.query;

    const statusQ: CriteriaOptionsStatus | undefined = Object.values(
      CriteriaOptionsStatus
    ).includes(status as CriteriaOptionsStatus)
      ? CriteriaOptionsStatus[status as CriteriaOptionsStatus]
      : undefined;

    const locationTypeQ: CriteriaOptionsLocation | undefined = Object.values(
      CriteriaOptionsLocation
    ).includes(locationType as CriteriaOptionsLocation)
      ? CriteriaOptionsLocation[locationType as CriteriaOptionsLocation]
      : undefined;

    let locationQ: LocationEntity | undefined =
      locationTypeQ && typeof location === 'string' && location != ''
        ? {
            name: location.toUpperCase(),
            type: locationTypeQ
          }
        : undefined;

    const result = await this.commerceUseCase.findCommerces(statusQ, locationQ);
    res.status(200).send(result);
  };
}
