const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');

class ActivityTestData {
    static invalidActivityTestData() {
        return [
            {
                "id": "",
                "title": "",
                "dueDate": "",
                "completed": ""
            },
            {
                "id": RandomDataGenerator.generateUniqueId(),
                "title": "",
                "dueDate": "",
                "completed": ""
            },
            {
                "id": RandomDataGenerator.generateUniqueId(),
                "title": RandomDataGenerator.generateTitle(),
                "dueDate": "",
                "completed": ""
            },
            {
                "id": RandomDataGenerator.generateUniqueId(),
                "title": RandomDataGenerator.generateTitle(),
                "dueDate": RandomDateGenerator.generateDueDate(),
                "completed": ""
            }
        ];
    }
}

module.exports = ActivityTestData;
