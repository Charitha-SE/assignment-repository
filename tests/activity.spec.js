const { test, expect } = require('@playwright/test');
const { createRecord,updateRecord, deleteRecord  } = require('../helpers/requestMethods.js');
const ApiEndpoints = require('../Constants/EndPoint.js');

const endPoints = new ApiEndpoints().getEndPoints();

test.describe('Testing Negative Scenarios for GET /activities API', () => {

    test('Validate fetching non-existing activity id', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/9999`);
    
        expect(response.status()).toBe(404);
    });
    
    test('Validate fetching activity with invalid ID format', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/abc`);
    
        expect(response.status()).toBe(400);
    });
    
    test('Validate fetching activity with negative ID', async ({ request }) => {
        const response = await request.get(`${endPoints.activities}/-1`);
    
        expect(response.status()).toBe(404);
    });
});



test.describe('Testing Negative Scenarios for POST /activities API', () => {

    test('Validate When ID Field is Missing', async ({ request }) => {
        const postData = { 
            title: "Sample Activity", 
            dueDate: "2024-09-30", 
            completed: true 
        };
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
    
    test('Validate by passing non-numeric ID', async ({ request }) => {
        const postData = { 
            id: "abc", 
            title: "Sample Activity", 
            dueDate: "2024-09-30", 
            completed: false 
        };
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
    
    test('Validate by adding extraField', async ({ request }) => {
        const postData = { 
            id: 123, 
            title: "Sample Activity", 
            dueDate: "2024-09-30", 
            completed: false, 
            extraField: "test" 
        };
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
    
    test('Validate when completed is Provided as a String', async ({ request }) => {
        const postData = { 
            id: 123, 
            title: "Sample Activity", 
            dueDate: "2024-09-30", 
            completed: "true" 
        };
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
    
    test('Validate by sending an empty body {}', async ({ request }) => {
        const postData = {};
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
    
    test('Validate by creating activity with the existing id', async ({ request }) => {
        const postData = { 
            id: 1, 
            title: "Sample Activity", 
            dueDate: "2024-09-30", 
            completed: false 
        };
    
        await createRecord(request, postData, endPoints.activities);
    
        const response = await createRecord(request, postData, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });    
});

test.describe('Testing Negative Scenarios for PUT /activities API', () => {

    test('Validate with an invalid ID format', async ({ request }) => {
        const activityId = "invalid-id!@#";
        const postData = { title: "Updated Activity", dueDate: "2024-10-01", completed: true };
        
        const response = await updateRecord(request, postData, activityId, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });

    test('Validate when completed value is Provided as a incorrect data type', async ({ request }) => {
        const activityId = 1; 
        const postData = { 
            title: "Updated Activity", 
            dueDate: "2024-10-01", 
            completed: "not_a_boolean" 
        }; 
        
        const response = await updateRecord(request, postData, activityId, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });

    test('Validate with an empty body', async ({ request }) => {
        const activityId = 1;
        const postData = {};
        
        const response = await updateRecord(request, postData, activityId, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
});


test.describe('Testing Negative Scenario for DELETE /activities API', () => {

    test('Validate by an ID containing special characters', async ({ request }) => {
        const activityID = "&%^@";
        const response = await deleteRecord(request, activityID, endPoints.activities);
        
        expect(response.status()).toBe(400);
    });
});

