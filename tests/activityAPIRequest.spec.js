const { test, expect } = require('@playwright/test');
const { createRecord, getList, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const { EndPoints } = require('../Constants/EndPoint.js');
const { Data } = require('../test-data/payloadBody.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');


const endPoints = EndPoints();

test('Validate the activity list getting successfully', async ({ request }) => {
    const response = await getList(request, endPoints.activities);

    expect(await response.status()).toBe(200);
    expect(await response.ok()).toBeTruthy();
});

test('Validate the Activity is cretaed succsessfully', async ({ request }) => {
    const postData = Data.activities;

    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(await postAPIResponse.status()).toBe(200);
    expect(await postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();

    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("title", postData.title);
    expect(postAPIResponseBody).toHaveProperty("dueDate", postData.dueDate);
});

test('Validate the activity is not cretaed succsessfully', async ({ request }) => {
    const testeDatas = [
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
        for (const data of testeDatas) {
        const postAPIResponse = await createRecord(request, data, endPoints.activities);

        expect(await postAPIResponse.status()).toBe(400);
        expect(await postAPIResponse.ok()).toBeFalsy();

        const postAPIResponseBody = await postAPIResponse.json();
        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
        expect(postAPIResponseBody).toHaveProperty("status", 400);
        expect(postAPIResponseBody).toHaveProperty("errors");
     }
});

test('Validate the activity is updated succsessfully', async ({ request }) => {
    const postData = Data.activities;
 
     const createResponse = await createRecord(request, postData, endPoints.activities);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdActivity = await createResponse.json();
     const userId = createdActivity.id;
 
     const updateActivity = {
         "title": RandomDataGenerator.generateTitle(), 
         "dueDate": RandomDateGenerator.generateDueDate(),
         "completed": false
     };
 
     const updateResponse = await updateRecord(request, updateActivity, userId, endPoints.activities);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
    
 });
 
 test('Validate the activity is deleted succsessfully', async ({ request }) => {
 
     const postData = Data.activities;
 
     const createResponse = await createRecord(request, postData, endPoints.activities);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdActivity = await createResponse.json();
     const activityId = createdActivity.id;
 
     const deleteResponse = await deleteRecord(request, activityId, endPoints.activities);
     expect(deleteResponse.status()).toBe(200);
     expect(deleteResponse.ok()).toBeTruthy();
 
 });


