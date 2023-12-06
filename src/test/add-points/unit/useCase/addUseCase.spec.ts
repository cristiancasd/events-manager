import { AddUseCase } from '../../../../add-points/application/addUseCase';
import { DataBaseError } from '../../../../add-points/domain/errors/database-error';
import { DynamoRepository } from '../../../../add-points/infrastructure/repository/dynamo.repository';
import { MockTestRepository } from '../../../../add-points/infrastructure/repository/mockTest.repository';
import { DynamoRepositoryError } from '../../../setup';

const data = {
  documentCc: 455554,
  name: 'addUseCase',
  points: 54,
  detail: 'puntos por comprar una nevera',
  idUser: 'a9e2c4a3-403b-42a1-a716-af09c3cf1e70' // random User to test
};

describe('UNIT addUseCase - createAdd ', () => {
  it('should create a new object, adding ID (Mock)', async () => {
    const addRepo = new MockTestRepository();
    const addUseCase = new AddUseCase(addRepo);
    const res = await addUseCase.createAdd(data);
    expect(res).toMatchObject(data);
  });

  it('should create a new object, adding ID (DynamoDB)', async () => {
    const addRepo = new DynamoRepository();
    const addUseCase = new AddUseCase(addRepo);
    const res = await addUseCase.createAdd(data);
    expect(res).toMatchObject(data);
  });

  it('should return a DataBaseError if exist a problem with DynamoDB', async () => {
    const addRepo = new DynamoRepositoryError(); //The db table name don´t exist in DynamoDB
    const addUseCase = new AddUseCase(addRepo);
    try {
      const res = await addUseCase.createAdd(data);
      expect(res?.documentCc).toEqual('itsToBeShureThatExpectTheErrorCatch');
    } catch (err) {
      expect(err).toBeInstanceOf(DataBaseError);
    }
  });
});
