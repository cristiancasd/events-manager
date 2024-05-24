import { Request, Response } from 'express';
import { LevelUseCase } from '../../application/levelUseCase';

export class LevelController {
  constructor(private levelUseCase: LevelUseCase) {}

  public insertCtrl = async (req: Request, res: Response) => {
    const body = req.body;
    const level = await this.levelUseCase.createLevel(body);
    res.status(201).send(level);
  };

  public editCtrl = async (req: Request, res: Response) => {
    const result = await this.levelUseCase.editLevel(req.body);
    res.status(200).send(result);
  };

  public deleteCtrl = async (req: Request, res: Response) => {
    const { levelId } = req.params;
    const result = await this.levelUseCase.deleteLevelByUid(levelId);
    res.status(200).send(result);
  };

  public findCtrl = async (req: Request, res: Response) => {
    const { levelId } = req.params;
    const result = await this.levelUseCase.findLevelByUid(levelId);
    res.status(200).send(result);
  };

  public findLevelByCommerceCtrl = async (req: Request, res: Response) => {
    const { commerceUid } = req.params;
    const result = await this.levelUseCase.findLevelsByCommerce(commerceUid);
    res.status(200).send(result);
  };
}
