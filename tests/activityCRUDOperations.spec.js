const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const ApiEndpoint = require('../Constants/EndPoint.js');
const { Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');
const { assertResponseStatus } = require('../helpers/AssertionHelper.js');
const testData = require('../test-data/testData.js');

const endPoints = new ApiEndpoint();

test('Validate the activity list is retrieved successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.activities);
    expect(response.status()).toBe(200);
});

test('Validate the activity is created successfully', async ({ request }) => {
    const postData = Data.activities;
    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("title", postData.title);
    expect(postAPIResponseBody).toHaveProperty("dueDate", postData.dueDate);
});

test('Validate activity creation and retrieval by ID', async ({ request }) => {
    const postData = Data.activities;
    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody = await postAPIResponse.json();
    const createdActivityId = postAPIResponseBody.id;

    const getAPIResponse = await request.get(`${endPoints.activities}/${createdActivityId}`);
    expect(getAPIResponse.status()).toBe(200);
});

test('Validate the activity is updated successfully', async ({ request }) => {
    const postData = Data.activities;
    const createResponse = await createRecord(request, postData, endPoints.activities);
    expect(createResponse.status()).toBe(200);

    const createdActivity = await createResponse.json();
    const activityId = createdActivity.id;

    const updateActivity = {
        title: RandomDataGenerator.generateTitle(),
        dueDate: RandomDateGenerator.generateDueDate(),
        completed: false,
    };

    const updateResponse = await updateRecord(request, updateActivity, activityId, endPoints.activities);
    expect(updateResponse.status()).toBe(200);
});

test('Validate the activity is updated and changes are reflected', async ({ request }) => {
    const postData = Data.activities;
    const createResponse = await createRecord(request, postData, endPoints.activities);
    const createdActivity = await createResponse.json();
    const activityId = createdActivity.id;

    const updateActivity = {
        title: RandomDataGenerator.generateTitle(),
        dueDate: RandomDateGenerator.generateDueDate(),
        completed: false,
    };

    await updateRecord(request, updateActivity, activityId, endPoints.activities);

    const getUpdatedResponse = await request.get(`${endPoints.activities}/${activityId}`);
    const getUpdatedActivity = await getUpdatedResponse.json();

    expect(getUpdatedActivity).toHaveProperty("title", updateActivity.title);
    expect(getUpdatedActivity).toHaveProperty("dueDate", updateActivity.dueDate);
});

test('Validate the activity is deleted successfully', async ({ request }) => {
    const postData = Data.activities;
    const createResponse = await createRecord(request, postData, endPoints.activities);
    const createdActivity = await createResponse.json();
    const activityId = createdActivity.id;

    const deleteResponse = await deleteRecord(request, activityId, endPoints.activities);
    expect(deleteResponse.status()).toBe(200);

    const getDeletedResponse = await request.get(`${endPoints.activities}/${activityId}`);
    expect(getDeletedResponse.status()).toBe(404);
});

const executeApiTest = (testCaseDescription, requestFunc, data, expectedStatus) => {
    test(testCaseDescription, async ({ request }) => {
        const response = await requestFunc(request, data, endPoints.activities);
        await assertResponseStatus(response, expectedStatus);
    });
};

test.describe('Testing Negative Scenarios for GET /activities API', () => {
    executeApiTest('Fetch non-existing activity id', async (request) => request.get(`${endPoints.activities}/${testData.nonExistingActivityId}`), null, 404);
    executeApiTest('Fetch activity with invalid ID format', async (request) => request.get(`${endPoints.activities}/${testData.invalidIdFormat}`), null, 400);
    executeApiTest('Fetch activity with negative ID', async (request) => request.get(`${endPoints.activities}/${testData.negativeId}`), null, 404);
});

test.describe('Testing Negative Scenarios for POST /activities API', () => {
    executeApiTest('ID Field is Missing', createRecord, testData.missingIdField, 400);
    executeApiTest('Non-numeric ID', createRecord, testData.nonNumericId, 400);
    executeApiTest('Add extra field', createRecord, testData.extraField, 400);
    executeApiTest('Completed provided as string', createRecord, testData.completedAsString, 400);
    executeApiTest('Empty body', createRecord, testData.emptyBody, 400);

    const existingActivityData = testData.existingId;
    executeApiTest('Create activity with existing ID', createRecord, existingActivityData, 400);
});

test.describe('Testing Negative Scenarios for PUT /activities API', () => {
    executeApiTest('Invalid ID format', updateRecord, testData.invalidIdFormat, 400);
    executeApiTest('Completed as incorrect type', updateRecord, testData.completedAsIncorrectType, 400);
    executeApiTest('Empty body', updateRecord, testData.emptyBody, 400);
});


test.describe('Testing Negative Scenario for DELETE /activities API', () => {
    executeApiTest('ID contains special characters', deleteRecord, testData.specialCharId, 400);
});

