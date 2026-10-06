
import {test, expect} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

let userId: number;

test.describe.serial('running end to end gorest crud apis tests', () => {

    // GET Test:
    test('GET API - Get all users', async({apiHelper}) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // POST Test:
    test('POST API - create u new user', async({apiHelper}) => {

        let userData = {
            "name": "Playwrigth API Auto User",
            "email": `pwauto_${Date.now()}@open.com`,
            "gender": "male",
            "status": "active"
        };

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        expect(response.status).toBe(201);
        userId = response.body.id;
        console.log('created user id:', userId);
    });

    // PUT Test:
    test('PUT API - update a user', async({apiHelper}) => {

        let userData = {
            "name": "Manish API Auto User",
            "status": "inactive"
        };

        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
    });

    // DELETE Test:
    test('DELETE API - delete a user', async({apiHelper}) => {
        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);
    });
})