import { LevelUseCase } from "../../../levels";

export const  seedLevelsService=async (levelUseCase: LevelUseCase,commerceUid: string)=>  {
    let levelUid1 = '';
    let levelUid2 = '';
    const level1 = {
      id: '',
      name: "example level 1",
      typeId: 4,
      commerceUid,
    };
    const level2 = {
      id: '',
      name: "example level 2",
      typeId: 4,
      commerceUid,
    };
    try {
      const levelsFound = await levelUseCase.findLevelsByCommerce(commerceUid);
      levelsFound.map(data => {
        if (data.name.toLowerCase() === level1.name.toLowerCase()) levelUid1 = data.id;
        if (data.name.toLowerCase() === level2.name.toLowerCase()) levelUid2 = data.id;
      });
      if (levelUid1 === '') {
        const levelCreated1 = await levelUseCase.createLevel(level1);
        levelUid1 = levelCreated1.id;
      }
      if (levelUid2 === '') {
        const levelCreated2 = await levelUseCase.createLevel(level2);
        levelUid2 = levelCreated2.id;
      }
    } catch (err) { }
    return { levelUid1, levelUid2 };
  }