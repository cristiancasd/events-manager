import { CriteriaOptionsLocation } from '../../../../core';
import { CommerceUseCase } from '../../../commerce';

export const seedCommerceService = async (commerceUseCase: CommerceUseCase) => {
  try {
    const commerce = {
      nick: 'example-nick',
      name: 'ex. Name',
      phone: '3000000000',
      email: 'example@example.co',
      countryCode: 'EXAMPLE',
      city: 'cali',
      dateFinish: '3000-10-10',
      totalFreePresale: 4,
      isActive: true,
      id: ''
    };
    const commerceCreated = await commerceUseCase.createCommerce(commerce);
    return { commerceUid: commerceCreated.id };
  } catch (err) {
    const commerceFound = await commerceUseCase.findCommerces(undefined, {
      name: 'EXAMPLE',
      type: CriteriaOptionsLocation.country
    });
    return { commerceUid: commerceFound[0].id };
  }
};
