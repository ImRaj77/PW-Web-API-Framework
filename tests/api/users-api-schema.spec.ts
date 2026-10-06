
// Schema : type of response data
// ajv = node library for schema validation 
// npm install ajv

import Ajv from 'ajv';
import {test, expect} from '../../src/fixtures/apifixtures';

import { ApiHelper } from '../../src/api/ApiHelper';

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`
};

// setup ajv lib
let ajv = new Ajv();

// define JSON Schema:
let userSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};

// --------------------------

let userArraySchema = {
  "type": "array",
  "items": userSchema
};


test('@smoke Get a user - Schema Test', async({apiHelper}) => {
    let userData = {
            "name": "Manish",
            "email": `pwautomation_${Date.now()}@open.com`,
            "gender": "male",
            "status": "active"
    };

    // create a fresh user
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    let userId = response.body.id;
    console.log('created user id:', userId);

    // get user
    let getResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    // verify the response schema
    let validate = ajv.compile(userSchema);                     // compile entire schema
    let isSchemaValid = validate(getResponse.body);             // 
    if(!isSchemaValid) {
        console.log('SCHEMA ERRORS: ', validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});


test('@smoke Get all users - Schema Test', async({apiHelper}) => {

    // get all users
    let getResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    // verify the response schema
    let validate = ajv.compile(userArraySchema);                     // compile entire schema
    let isSchemaValid = validate(getResponse.body);              
    if(!isSchemaValid) {
        console.log('SCHEMA ERRORS: ', validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});