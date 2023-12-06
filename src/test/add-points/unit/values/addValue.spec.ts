import { AddValue } from '../../../../add-points/domain/addPoints/add.value';

const data = {
  documentCc: 455554,
  name: 'addUseCase',
  points: 54,
  detail: 'puntos por comprar una nevera',
  idUser: 'a9e2c4a3-403b-42a1-a716-af09c3cf1e70' // random User to test
};

describe('UNIT value AddValue  ', () => {
  it("should return a object adding 'id' to data Value ", async () => {
    const addValue = new AddValue(data);
    expect(addValue.id).toBeDefined();
    expect(addValue).toMatchObject({ ...data, id: addValue.id });
  });
});
