
import { ApiHelper } from '../../src/api/ApiHelper';
import {test, expect} from '../../src/fixtures/apiFixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

// Helper function - generic function -- create a user (POST call):

async function createUser(apiHelper: any) {
    let userData = {
        "name": "apiautomation",
        "email": `apiautomation${Date.now()}@open.com`,
        "gender": "male",
        "status": "active"
    };
    
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}


// Test 1:
// create a user test + verify : AAA
// POST --> user id --> GET / user id --> Verify
test('create a user test', async({apiHelper}) => {
    // create a fresh user
    let userResponse = await createUser(apiHelper);

    // get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');
});


// Test 2: Update a user test + verify : AAA
// POST --> userID --> GET ---> PUT ---> GET ---> Verify
test('update a user test', async({apiHelper}) => {
    // 1. create a fresh user
    let userResponse = await createUser(apiHelper);

    // 2. get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    // 3. update a user
    let userUpdatedData = {
        "name": "apiautomation-update",
        "status": "inactive"
    };
    let updatedResponse = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(updatedResponse.status).toBe(200);
    expect.soft(updatedResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(updatedResponse.body.status).toBe(userUpdatedData.status);

    // 4. get the user
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect.soft(getResponse.body.status).toBe(userUpdatedData.status);
});


// Test 3: Delete a user test + verify : AAA
// POST --> userID --> GET ---> Delete (204) ---> GET (404) ---> Verify
test('delete a user test', async({apiHelper}) => {
    // 1. create a fresh user
    let userResponse = await createUser(apiHelper);

    // 2. get the user
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('apiautomation');

    // 3. delete a user
    let updatedResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(updatedResponse.status).toBe(204);

    // 4. get a user
    getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
});