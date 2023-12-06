import { AddEntity } from '../add-points/domain/addPoints/add.entity';
import { AddRepository } from '../add-points/domain/addPoints/add.repository';
import { disconnectProducer } from '../add-points/infrastructure/broker/kafka';
import { DynamoDB } from '../add-points/infrastructure/db/dynamo-db';

//todo: delete all data by table after tests.
jest.setTimeout(100000);

afterAll(async () => {
  await disconnectProducer();
});

export class DynamoRepositoryError implements AddRepository {
  private readonly _db = DynamoDB.getInstance();

  async createAdd(add: AddEntity): Promise<AddEntity | null> {
    try {
      await this._db
        .putItem({
          TableName: 'ThisDBNameDontExist',
          Item: {
            id: {
              S: add.id
            },

            name: {
              S: add.name
            },
            documentCc: {
              N: add.documentCc.toString()
            },
            points: {
              N: add.points.toString()
            },
            detail: {
              S: add.detail
            },
            idUser: {
              S: add.idUser
            }
          }
        })
        .promise();

      return add;
    } catch (err) {
      return null;
    }
  }
}
