const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const { getApiEndPoints } = require('../Constants/EndPoint.js');
const { Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');
const ActivityTestData = require('../helpers/activityTestData.js');


const endPoints = getApiEndPoints();

test('Validate the activity list getting successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.activities);

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

test('Validate the Activity is created successfully and get the activity by its ID', async ({ request }) => {
    const postData = Data.activities;
 
    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(await postAPIResponse.status()).toBe(200);
    expect(await postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();
    
    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("title", postData.title);
    expect(postAPIResponseBody).toHaveProperty("dueDate", postData.dueDate);

    const createdActivityId = postAPIResponseBody.id;
    const getAPIResponse = await request.get(`${endPoints.activities}/${createdActivityId}`);
    
    expect(await getAPIResponse.status()).toBe(200);
    expect(await getAPIResponse.ok()).toBeTruthy();
});

test('Validate the activity is not created successfully', async ({ request }) => {
    const testDatas = ActivityTestData.invalidActivityTestData(); 

    for (const data of testDatas) {
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
     const activityId = createdActivity.id;
 
     const updateActivity = {
         "title": RandomDataGenerator.generateTitle(), 
         "dueDate": RandomDateGenerator.generateDueDate(),
         "completed": false
     };
 
     const updateResponse = await updateRecord(request, updateActivity, activityId, endPoints.activities);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
 });

 test('Validate the activity is updated successfully and the changes are properly reflected', async ({ request }) => {
    const postData = Data.activities;
 
     const createResponse = await createRecord(request, postData, endPoints.activities);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdActivity = await createResponse.json();
     const activityId = createdActivity.id;
 
     const updateActivity = {
         "title": RandomDataGenerator.generateTitle(), 
         "dueDate": RandomDateGenerator.generateDueDate(),
         "completed": false
     };
 
     const updateResponse = await updateRecord(request, updateActivity, activityId, endPoints.activities);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();

     const getUpdatedResponse = await request.get(`${endPoints.activities}/${activityId}`);

     expect(getUpdatedResponse.status()).toBe(200);
     expect(getUpdatedResponse.ok()).toBeTruthy();

     const getUpdatedActivity = await getUpdatedResponse.json();

     expect(getUpdatedActivity).toHaveProperty("title", updateActivity.title);
     expect(getUpdatedActivity).toHaveProperty("dueDate", updateActivity.dueDate);
     expect(getUpdatedActivity).toHaveProperty("completed", updateActivity.completed);
 });
 
 test('Validate the activity is deleted succsessfully', async ({ request }) => {
 
     const postData = Data.activities;
 
     const createResponse = await createRecord(request, postData, endPoints.activities);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdActivity = await createResponse.json();
     const activityId = createdActivity.id;
 
     const deleteResponse = await deleteRecord(request, activityId, endPoints.activities);
     expect(await deleteResponse.status()).toBe(200);
     expect(await deleteResponse.ok()).toBeTruthy();

     const getDeletedResponse = await request.get(`${endPoints.activities}/${activityId}`);
     expect(await getDeletedResponse.status()).toBe(404);
     expect(await getDeletedResponse.ok()).toBeFalsy(); 
 
 });


