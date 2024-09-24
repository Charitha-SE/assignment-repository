const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords,updateRecord,deleteRecord } = require('../helpers/requestMethods.js');
const ApiEndpoints = require('../Constants/EndPoint.js');
const{ Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');

const endPoints = new ApiEndpoints();

test('Validate the users list getting successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.users);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Validate the User is cretaed succsessfully', async ({ request }) => {
    const postData = Data.users;

    
    const postAPIResponse = await createRecord(request, postData, endPoints.users);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();

    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("userName", postData.userName);
    expect(postAPIResponseBody).toHaveProperty("password", postData.password);
});

test('Validate the User is not cretaed succsessfully', async ({ request }) => {
    const testDatas = [
        {
            "id": "",
            "userName": "",
            "password": ""
        },
        {
            "id": "",
            "userName": RandomDataGenerator.generateUserName(),
            "password": ""
        }

    ];
        for (const data of testDatas) {
        const postAPIResponse = await createRecord(request, data, endPoints.users);

        expect(await postAPIResponse.status()).toBe(400);
        expect(await postAPIResponse.ok()).toBeFalsy();

        const postAPIResponseBody = await postAPIResponse.json();

        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
        expect(postAPIResponseBody).toHaveProperty("status", 400);
        expect(postAPIResponseBody).toHaveProperty("errors");
     }
});
test('Validate the User record is updated succsessfully', async ({ request }) => {
    const postData = Data.users;
 
     const createResponse = await createRecord(request, postData, endPoints.users);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdUser = await createResponse.json();
     const userId = createdUser.id;
 
     const updatedUserData = {
         "userName": RandomDataGenerator.generateUserName(), 
         "password": RandomDataGenerator.generatePassword()  
     };
 
     const updateResponse = await updateRecord(request, updatedUserData, userId, endPoints.users);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
 });

test('Validate the User record is deleted succsessfully', async ({ request }) => {
    const postData = Data.users;

    const createResponse = await createRecord(request, postData, endPoints.users);
    expect(createResponse.status()).toBe(200);
    expect(createResponse.ok()).toBeTruthy();

    const createdUser = await createResponse.json();
    const userId = createdUser.id;

    const deleteResponse = await deleteRecord(request, userId, endPoints.users);
    expect(deleteResponse.status()).toBe(200);
    expect(deleteResponse.ok()).toBeTruthy();


    const getResponse = await getAllRecords(request, `${endPoints.users}/${userId}`);
    expect(getResponse.status()).toBe(404);

});
