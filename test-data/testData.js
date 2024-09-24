const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');

const testData = {
    nonExistingActivityId: 9999,
    invalidIdFormat: 'abc',
    negativeId: -1,

    postActivities: {
        missingIdField: { title: "Sample Activity", dueDate: "2024-09-30", completed: true },
        nonNumericId: { id: "abc", title: "Sample Activity", dueDate: "2024-09-30", completed: false },
        extraField: { id: 123, title: "Sample Activity", dueDate: "2024-09-30", completed: false, extraField: "test" },
        completedAsString: { id: 123, title: "Sample Activity", dueDate: "2024-09-30", completed: "true" },
        emptyBody: {},
        existingId: { id: 1, title: "Sample Activity", dueDate: "2024-09-30", completed: false }
    },

    putActivities: {
        invalidIdFormat: { title: "Updated Activity", dueDate: "2024-10-01", completed: true },
        completedAsIncorrectType: { title: "Updated Activity", dueDate: "2024-10-01", completed: "true" },
        emptyBody: {}
    },

    deleteActivities: {
        specialCharId: '&%^@'
    },

    invalidActivityData: [
        {
            id: "",
            title: "",
            dueDate: "",
            completed: ""
        },
        {
            id: RandomDataGenerator.generateUniqueId(),
            title: "",
            dueDate: "",
            completed: ""
        },
        {
            id: RandomDataGenerator.generateUniqueId(),
            title: RandomDataGenerator.generateTitle(),
            dueDate: "",
            completed: ""
        },
        {
            id: RandomDataGenerator.generateUniqueId(),
            title: RandomDataGenerator.generateTitle(),
            dueDate: RandomDateGenerator.generateDueDate(),
            completed: ""
        }
    ]
};

module.exports = testData;
