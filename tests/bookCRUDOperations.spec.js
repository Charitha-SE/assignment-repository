const { test, expect } = require('@playwright/test');
const { createRecord, getAllRecords, updateRecord, deleteRecord } = require('../helpers/requestMethods.js');
const { getApiEndPoints } = require('../Constants/EndPoint.js');
const{ Data } = require('../test-data/payload.js');
const RandomDataGenerator = require('../helpers/randomHelpers.js');
const RandomDateGenerator = require('../helpers/dateHelper.js');

const endPoints = getApiEndPoints();

test('Validate the books list getting successfully', async ({ request }) => {
    const response = await getAllRecords(request, endPoints.books);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('Validate the Book is cretaed succsessfully', async ({ request }) => {
    const postData = Data.books;

    
    const postAPIResponse = await createRecord(request, postData, endPoints.books);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.ok()).toBeTruthy();

    const postAPIResponseBody = await postAPIResponse.json();

    expect(postAPIResponseBody).toHaveProperty("id", postData.id);
    expect(postAPIResponseBody).toHaveProperty("title", postData.title);
    expect(postAPIResponseBody).toHaveProperty("description", postData.description);
    expect(postAPIResponseBody).toHaveProperty("pageCount", postData.pageCount);
    expect(postAPIResponseBody).toHaveProperty("excerpt", postData.excerpt);
    expect(postAPIResponseBody).toHaveProperty("publishDate", postData.publishDate);
});

test('Validate the Book is not cretaed succsessfully', async ({ request }) => {
    const testDatas = [
        {
            "id": "",
            "title": "",
            "description": "",
            "pageCount": "",
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": "",
            "description": "",
            "pageCount": "",
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": "",
            "pageCount": "",
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": "",
            "pageCount": "",
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": RandomDataGenerator.generateDescription(),
            "pageCount": "",
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": RandomDataGenerator.generateDescription(),
            "pageCount": RandomDataGenerator.generatePageCount(),
            "excerpt": "",
            "publishDate": ""
        },
        {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": RandomDataGenerator.generateDescription(),
            "pageCount": RandomDataGenerator.generatePageCount(),
            "excerpt": RandomDataGenerator.generateExcerpt(),
            "publishDate": ""
        }
    ];
        for (const data of testDatas) {
        const postAPIResponse = await createRecord(request, data, endPoints.books);

        expect(await postAPIResponse.status()).toBe(400);
        expect(await postAPIResponse.ok()).toBeFalsy();

        const postAPIResponseBody = await postAPIResponse.json();

        expect(postAPIResponseBody).toHaveProperty("title", "One or more validation errors occurred.");
        expect(postAPIResponseBody).toHaveProperty("status", 400);
        expect(postAPIResponseBody).toHaveProperty("errors");
     }
});

test('Validate the Book is updated succsessfully', async ({ request }) => {
    const postData = Data.books;
 
     const createResponse = await createRecord(request, postData, endPoints.books);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdBook = await createResponse.json();
     const bookId = createdBook.id;
 
     const updateBook= {
            "id": RandomDataGenerator.generateUniqueId(),
            "title": RandomDataGenerator.generateTitle(),
            "description": RandomDataGenerator.generateDescription(),
            "pageCount": RandomDataGenerator.generatePageCount(),
            "excerpt": RandomDataGenerator.generateExcerpt(),
            "publishDate": RandomDateGenerator.generatePublishDate()
     
     };
 
     const updateResponse = await updateRecord(request, updateBook, bookId, endPoints.books);
     expect(updateResponse.status()).toBe(200);
     expect(updateResponse.ok()).toBeTruthy();
 });
 
 
 test('Validate the Book is deleted succsessfully', async ({ request }) => {
 
     const postData = Data.books;
 
     const createResponse = await createRecord(request, postData, endPoints.books);
     expect(createResponse.status()).toBe(200);
     expect(createResponse.ok()).toBeTruthy();
 
     const createdBook = await createResponse.json();
     const bookId = createdBook.id;
 
     const deleteResponse = await deleteRecord(request, bookId, endPoints.books);
     expect(deleteResponse.status()).toBe(200);
     expect(deleteResponse.ok()).toBeTruthy();
 
 });
 
 