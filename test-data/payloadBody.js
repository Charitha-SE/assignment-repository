const RandomDataGenerator = require('../helpers/randomHelpers');
const RandomDateGenerator = require('../helpers/dateHelper')

const Data = {
  "activities": {
    "id": RandomDataGenerator.generateUniqueId(),
    "title": RandomDataGenerator.generateTitle(),
    "dueDate": RandomDateGenerator.generateDueDate(),
    "completed": true
  },
  "authors": {
    "id": RandomDataGenerator.generateUniqueId(),
    "idBook": RandomDataGenerator.generateIdBook(),
    "firstName": RandomDataGenerator.generateFirstName(),
    "lastName": RandomDataGenerator.generateLastName()
  },
  "books": {
    "id": RandomDataGenerator.generateUniqueId(),
    "title": RandomDataGenerator.generateTitle(),
    "description": RandomDataGenerator.generateDescription(),
    "pageCount": RandomDataGenerator.generatePageCount(),
    "excerpt": RandomDataGenerator.generateExcerpt(),
    "publishDate": RandomDateGenerator.generatePublishDate()
  },
  "coverPhotos": {
    "id": RandomDataGenerator.generateUniqueId(),
    "idBook": RandomDataGenerator.generateIdBook(),
    "url": RandomDataGenerator.generateUrl()
  },
  "users": {
    "id": RandomDataGenerator.generateUniqueId(),
    "userName": RandomDataGenerator.generateUserName(),
    "password": RandomDataGenerator.generatePassword()
  }
};

module.exports = { Data };


