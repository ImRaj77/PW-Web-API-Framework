
import {CsvHelper} from '../src/utils/CsvHelper';
import {ExcelHelper} from '../src/utils/ExcelHelper';
import {JsonHelper} from '../src/utils/JsonHelper';

import {test, expect} from '../src/fixtures/pagefixtures';
import * as allure from 'allure-js-commons';
import {log, meta, testData} from 'reporting-labs';

test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
});

test('Login page title - test', async ({loginPage}) => {
    meta({priority: 'P2', severity: 'minor', owner: 'Raja', story: 'US101', epic: 'ep300', feature: 'F30', issue: 'bug34'});

    let pageTitle = await loginPage.getPageTitle();
    console.log('Login page title',pageTitle);
    await log('Login page title',pageTitle);

    expect(pageTitle).toBe('Account Login');
});

test('Forgotten pwd link - test', async ({loginPage}) => {
    meta({priority: 'P1', severity: 'critical', owner: 'Raja123', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35'});
    expect(await loginPage.isForgottenPwdLinkExists()).toBeTruthy();
});

test('user is able to login to the app with valid credentials - test', async ({loginPage, homePage}) => {
    meta({priority: 'P1', severity: 'major', owner: 'Ajit1', story: 'US103', epic: 'ep103', feature: 'F32', issue: 'bug37'});
    await testData({username: process.env.USERNAME!, password: process. env.PASSWORD!}, 'Login');

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");
    
    // Allure report is not recommended to use with Playwright 
    // Reporting Labs is a better option

    await allure.step("Login with valid creds", async () => {
        await loginPage.doLogin(process.env.USERNAME!, process. env.PASSWORD!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
    });

    await allure.step("Verify logout home page title is visible", async () => {
        expect.soft (await homePage.getHomePageTitle()).toBe( 'My Account');
    });
});

// Pros : Light weight, easy to maintain/read, 3rd party library is available (csv-parse), best for large set of data
// DD_1: read csv data from csv file and loop the test method row wise....
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for(let row of testCSVData) {
    test(`user is trying to login to the app with invalid credentials with CSV Data - ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {
        meta({priority: 'P2', severity: 'major', owner: 'Ajit', story: 'US103', epic: 'ep103', feature: 'F32', issue: 'bug37'});
        await testData(testCSVData, 'Invalid login credentials');
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

// Cons : files get corrupt
// 1. maintenance  2. MS Licenses 
// DD_2: read xlsx data from excel file and loop the test method row wise....
let testExcelData = ExcelHelper.readExcel('src/testdata/opencart.xlsx', 'login');
for(let row of testExcelData) {
    test(`user is trying to login to the app with invalid credentials with Excel data- ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {
        meta({priority: 'P2', severity: 'major', owner: 'Ajit1', story: 'US103', epic: 'ep103', feature: 'F32', issue: 'bug37'});
        await testData(testExcelData, 'Invalid login credentials');
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

// Pros: light weight, light weight compared to xlsx, inbuild methods are available, best for smaller set of data
// DD_3: read JSON data from .json file and loop the test method row wise....
let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');
for(let row of testJsonData) {
    test(`user is trying to login to the app with invalid credentials with Json data- ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {
        meta({priority: 'P2', severity: 'major', owner: 'Ajit1', story: 'US103', epic: 'ep103', feature: 'F32', issue: 'bug37'});
        await testData(testJsonData, 'Invalid login credentials');
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


// Common features tests 
test('Application logo exists or not on the login page', async({basePage}) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Searchbox is visible or not on the login page', async({basePage}) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart exists on the login page or not', async({basePage}) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('Footers exists on the login page or not', async({basePage}) => {
    expect(await basePage.getPageFootersCount()).toBeGreaterThan(0);
});