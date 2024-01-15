import { faker } from '@faker-js/faker';

export default () => {
  return {
    id: faker.number.int({ max: 100000 }),
    user_id: faker.number.int({ max: 100000 }),
    created_at: faker.date.recent(),
    total_amount: faker.number.int({ min: 1, max: 100 }),
    products: [1, 2, 3],
  };
};
