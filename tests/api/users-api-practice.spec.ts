
import {test, expect, request, APIResponse} from '@playwright/test';
import { json } from 'node:stream/consumers';

let AUTH_TOKEN = {
    Authorization : 'Bearer 87a783d2e4b44db408755ee0505d68bddd4029d81ffc42a3fe9e2f98af1e67d0'
};

test('get all users api test', async ({request}) => {
    let response : APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log('status code :',response.status());
    console.log('status text :', response.statusText());

    expect(response.status()).toBe(200);
})


test('create u user POST api test', async ({request}) => {

    // user JS object:
    let userData = {
        "name": "Playwrigth API Auto User",
        "email": `pwauto_${Date.now()}@open.com`,
        "gender": "male",
        "status": "active"
    }
    let response : APIResponse = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });
    
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log('status code :',response.status());             // 201
    console.log('status text :', response.statusText());        // created

    expect(response.status()).toBe(201);
})


test('update u user PUT api test', async ({request}) => {

    // user JS object:
    let userData = {
        "name": "Manish API Auto User",
        "email": "pwapi@auto.com",
        "gender": "male",
        "status": "inactive"
    }
    let response : APIResponse = await request.put('https://gorest.co.in/public/v2/users/8640957', {
        headers: AUTH_TOKEN,
        data: userData
    });
    
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log('status code :',response.status());             // 200
    console.log('status text :', response.statusText());        // ok

    expect(response.status()).toBe(200);
})


test('update u user PATCH api test', async ({request}) => {

    // user JS object:
    let userData = {
        "status": "active"
    }
    let response : APIResponse = await request.patch('https://gorest.co.in/public/v2/users/8640957', {
        headers: AUTH_TOKEN,
        data: userData
    });
    
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log('status code :',response.status());             // 200
    console.log('status text :', response.statusText());        // ok

    expect(response.status()).toBe(200);
})


test('delete created user DELETE api test', async ({request}) => {
    
    let response : APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8640971', {
        headers: AUTH_TOKEN
    });
    
    // let jsonBody = await response.json();
    // console.log(jsonBody);
    console.log('status code :',response.status());             // 204
    console.log('status text :', response.statusText());        // No Content

    expect(response.status()).toBe(204);
})