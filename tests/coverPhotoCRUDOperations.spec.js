const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const { getApiEndPoints } = require('../Constants/EndPoint.js');
const{ Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');

const endPoints = getApiEndPoints();

test('Validate the coverphotos list getting successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.coverPhotos);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Validate the CoverPhoto is cretaed succsessfully', async ({ request }) => {
    const postData = Data.coverPhotos;

    
    const postAPIResponse = await createRecord(request, postData, endPoints.coverPhotos);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();

    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("idBook", postData.idBook);
});

test('Validate the CoverPhoto is not cretaed succsessfully', async ({ request }) => {
    const testDatas = [
        {
            "id": "",
            "idBook": "",
            "url": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "idBook": "",
            "url": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "idBook": "",
            "url": RandomDataGenerator.generateUrl()
        }

    ];
        for (const data of testDatas) {
        const postAPIResponse = await createRecord(request, data, endPoints.coverPhotos);

        expect(await postAPIResponse.status()).toBe(400);
        expect(await postAPIResponse.ok()).toBeFalsy();

        const postAPIResponseBody = await postAPIResponse.json();

        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
        expect(postAPIResponseBody).toHaveProperty("status", 400);
        expect(postAPIResponseBody).toHaveProperty("errors");
     }
});

test('Validate the CoverPhoto is updated succsessfully', async ({ request }) => {
    const postData = Data.coverPhotos;
 
     const createResponse = await createRecord(request, postData, endPoints.coverPhotos);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdCoverPhoto = await createResponse.json();
     const coverPhotoId = createdCoverPhoto.id;
 
     const updateCoverPhoto= {
         "id": RandomDataGenerator.generateUniqueId(), 
         "idBook": RandomDataGenerator.generateIdBook(),
         "url": RandomDataGenerator.generateUrl(),
     
     };

     const updateResponse = await updateRecord(request, updateCoverPhoto, coverPhotoId, endPoints.coverPhotos);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
 });
 
 
 test('Validate the CoverPhoto is deleted succsessfully', async ({ request }) => {
 
     const postData = Data.coverPhotos;
 
     const createResponse = await createRecord(request, postData, endPoints.coverPhotos);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdCoverPhoto = await createResponse.json();
     const coverPhotoId = createdCoverPhoto.id;
 
     const deleteResponse = await deleteRecord(request, coverPhotoId, endPoints.coverPhotos);
     expect(deleteResponse.status()).toBe(200);
     expect(deleteResponse.ok()).toBeTruthy();
 
 });
 
 
