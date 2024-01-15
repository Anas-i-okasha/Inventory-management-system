import { Factory } from '@adrien-may/factory';
import { faker } from '@faker-js/faker';
import { UsersEntity } from 'src/user/user.entity';

export class UsersEntityFactory extends Factory<UsersEntity> {
  entity = UsersEntity
  attrs = {
    id: faker.number.int({ max: 100000 }),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.string.alpha(),
    phone_number: faker.phone.number(),
    create_date: faker.date.recent(),
    is_deleted: faker.datatype.boolean(),
  };
}
