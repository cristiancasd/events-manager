import { Request, Response } from 'express';
import { SeedUseCase } from '../../application';

export class SeedController {
  constructor(private seedUseCase: SeedUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const result = await this.seedUseCase.createSeed();
    res.status(200).send(result);
  };
}
