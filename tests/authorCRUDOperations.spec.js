const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const ApiEndpoint = require('../Constants/EndPoint.js');
const { Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');


const endPoints = new ApiEndpoint();


test('Validate the authors list getting successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.authors);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Validate the author is cretaed succsessfully', async ({ request }) => {
    const postData = Data.authors;

    const postAPIResponse = await createRecord(request, postData, endPoints.authors);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();

    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("idBook", postData.idBook);
    expect(postAPIResponseBody).toHaveProperty("firstName", postData.firstName);
    expect(postAPIResponseBody).toHaveProperty("lastName", postData.lastName);
});
test('Validate the author is not cretaed succsessfully', async ({ request }) => {
    const testDatas = [
        {
            "id": "",
            "idBook": "",
            "firstName": "",
            "lastName": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "idBook": "",
            "firstName": "",
            "lastName": ""
        }
    ];
        for (const data of testDatas) {
        const postAPIResponse = await createRecord(request, data, endPoints.authors);

        expect(await postAPIResponse.status()).toBe(400);
        expect(await postAPIResponse.ok()).toBeFalsy();

        const postAPIResponseBody = await postAPIResponse.json();

        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
        expect(postAPIResponseBody).toHaveProperty("status", 400);
        expect(postAPIResponseBody).toHaveProperty("errors");
     }
});

test('Validate the author is updated succsessfully', async ({ request }) => {
    const postData = Data.authors;
 
     const createResponse = await createRecord(request, postData, endPoints.authors);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdAuthor = await createResponse.json();
     const authorId = createdAuthor.id;
 
     const updateAuthor = {
         "id": RandomDataGenerator.generateUniqueId(), 
         "idBook": RandomDataGenerator.generateIdBook(),
         "firstName": RandomDataGenerator.generateFirstName(),
         "lastName": RandomDataGenerator.generateLastName()
     };
 
     const updateResponse = await updateRecord(request, updateAuthor, authorId, endPoints.authors);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
});
 
test('Validate the author is deleted succsessfully', async ({ request }) => {
 
     const postData = Data.authors;
 
     const createResponse = await createRecord(request, postData, endPoints.authors);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdAuthor = await createResponse.json();
     const authorId = createdAuthor.id;
 
     const deleteResponse = await deleteRecord(request, authorId, endPoints.authors);
     expect(deleteResponse.status()).toBe(200);
     expect(deleteResponse.ok()).toBeTruthy();
 
});
 
 
