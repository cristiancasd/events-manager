import { AddBrokerUserCase } from '../../../../add-points/application/addBrokerUseCase';
import { BrokerError } from '../../../../add-points/domain/errors/broker-error';

import {
  connectProducer,
  disconnectProducer
} from '../../../../add-points/infrastructure/broker/kafka';
import { KafkaRespository } from '../../../../add-points/infrastructure/repository/kafka.repository';

beforeAll(async () => {
  await connectProducer();
});

afterAll(async () => {
  //await disconnectProducer();
});

const data = {
  documentCc: 998752,
  name: 'addBrokerUseCase',
  score: 54,
  id: 'a9e2c4a3-403b-42a1-a716-af09c3cf1e70' // random User to test
};

const expectResponse = {
  topic: 'add_created',
  message: data
};

describe('UNIT addBrokerUseCase -> sendMessageBroker', () => {
  it('should create a new object type BrokerEntity', async () => {
    const addBroker = new KafkaRespository();
    const addBrokerUseCase = new AddBrokerUserCase(addBroker);
    const res = await addBrokerUseCase.sendMessageBroker(data);
    expect(res).toMatchObject(expectResponse);
  });

  it('should return a BrokerError if the producer is disconect', async () => {
    await disconnectProducer();
    const addBroker = new KafkaRespository();
    const addBrokerUseCase = new AddBrokerUserCase(addBroker);
    try {
      const res = await addBrokerUseCase.sendMessageBroker(data);
      expect(res?.topic).toEqual('itsToBeShureThatExpectTheErrorCatch');
    } catch (err) {
      expect(err).toBeInstanceOf(BrokerError);
    }
  });
});
