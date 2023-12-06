import { BrokerValue } from '../../../../add-points/domain/broker/broker.value';

const data = {
  documentCc: 998752,
  name: 'addBrokerUseCase',
  score: 54,
  id: 'a9e2c4a3-403b-42a1-a716-af09c3cf1e70' // random User to test
};

const message = {
  topic: 'add_created',
  message: data
};

describe('UNIT value BrokerValue  ', () => {
  it("should return a object asign the input to 'message', and added topic: 'add_creater'", async () => {
    const brokerValue = new BrokerValue(data);
    expect(brokerValue).toMatchObject(message);
  });
});
