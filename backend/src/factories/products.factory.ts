import { faker } from '@faker-js/faker';

export default () => {
  return {
    id: faker.number.int({ max: 100000 }),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 1, max: 100 }),
    stock_quantity: faker.number.int({ min: 1, max: 100 }),
    create_date: faker.date.recent(),
  };
};
