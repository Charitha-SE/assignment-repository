const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const ApiEndpoints = require('../Constants/EndPoint.js');
const { Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');
const { assertResponseStatus } = require('../helpers/AssertionHelper.js');
const testData = require('../test-data/testData.js');

const endPoints = new ApiEndpoints();

test('Validate the activity list is retrieved successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.activities);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Validate the activity is created successfully', async ({ request }) => {
    const postData = Data.activities;
    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();
    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("title", postData.title);
    expect(postAPIResponseBody).toHaveProperty("dueDate", postData.dueDate);
});

test('Validate activity creation and retrieval by ID', async ({ request }) => {
    const postData = Data.activities;
    const postAPIResponse = await createRecord(request, postData, endPoints.activities);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();
    const createdActivityId = postAPIResponseBody.id;
    
    const getAPIResponse = await request.get(`${endPoints.activities}/${createdActivityId}`);
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.ok()).toBeTruthy();
});

test('Validate the activity is not created with invalid data', async ({ request }) => {
    const invalidDataSets = testData.invalidActivityData;

    for (const data of invalidDataSets) {
        const postAPIResponse = await createRecord(request, data, endPoints.activities);
        expect(postAPIResponse.status()).toBe(400);
        const postAPIResponseBody = await postAPIResponse.json();
        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
    }
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

test.describe('Testing Negative Scenarios for GET /activities API', () => {
    test('Fetch non-existing activity id', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/${testData.nonExistingActivityId}`);
        await assertResponseStatus(response, 404);
    });

    test('Fetch activity with invalid ID format', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/${testData.invalidIdFormat}`);
        await assertResponseStatus(response, 400);
    });

    test('Fetch activity with negative ID', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/${testData.negativeId}`);
        await assertResponseStatus(response, 404);
    });
});

test.describe('Testing Negative Scenarios for POST /activities API', () => {
    test('ID Field is Missing', async ({ request }) => {
        const response = await createRecord(request, testData.postActivities.missingIdField, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Non-numeric ID', async ({ request }) => {
        const response = await createRecord(request, testData.postActivities.nonNumericId, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Add extra field', async ({ request }) => {
        const response = await createRecord(request, testData.postActivities.extraField, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Completed provided as string', async ({ request }) => {
        const response = await createRecord(request, testData.postActivities.completedAsString, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Empty body', async ({ request }) => {
        const response = await createRecord(request, testData.postActivities.emptyBody, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Create activity with existing ID', async ({ request }) => {
        await createRecord(request, testData.postActivities.existingId, endPoints.activities);
        const response = await createRecord(request, testData.postActivities.existingId, endPoints.activities);
        await assertResponseStatus(response, 400);
    });
});

test.describe('Testing Negative Scenarios for PUT /activities API', () => {
    test('Invalid ID format', async ({ request }) => {
        const response = await updateRecord(request, testData.putActivities.invalidIdFormat, testData.invalidIdFormat, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Completed as incorrect type', async ({ request }) => {
        const response = await updateRecord(request, testData.putActivities.completedAsIncorrectType, 1, endPoints.activities);
        await assertResponseStatus(response, 400);
    });

    test('Empty body', async ({ request }) => {
        const response = await updateRecord(request, testData.putActivities.emptyBody, 1, endPoints.activities);
        await assertResponseStatus(response, 400);
    });
});

test.describe('Testing Negative Scenario for DELETE /activities API', () => {
    test('ID contains special characters', async ({ request }) => {
        const response = await deleteRecord(request, testData.deleteActivities.specialCharId, endPoints.activities);
        await assertResponseStatus(response, 400);
    });
});
