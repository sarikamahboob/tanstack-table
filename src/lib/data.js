import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    profile: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(), 
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    birthDate: faker.date.birthdate(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 40,
});