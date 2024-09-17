const { faker } = require('@faker-js/faker');

class RandomDataGenerator {
  static generateUniqueId() {
    return faker.number.int({ min: 100, max: 500 });
  }

  static generateTitle() {
    return faker.lorem.word();
  }

  static generateIdBook() {
    return faker.number.int({ min: 1000, max: 9999 });
  }

  static generateFirstName() {
    return faker.person.firstName();
  }

  static generateLastName() {
    return faker.person.lastName();
  }

  static generateDescription() {
    return faker.lorem.words(5);
  }

  static generateExcerpt() {
    return faker.lorem.words(5);
  }

  static generatePageCount() {
    return faker.number.int({ min: 100, max: 500 });
  }

  static generateUserName() {
    return faker.internet.userName();
  }

  static generatePassword() {
    return faker.internet.password();
  }

  static generateUrl() {
    return faker.internet.url();
  }
}

module.exports = RandomDataGenerator;
