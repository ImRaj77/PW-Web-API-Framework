
import {CsvHelper} from '../src/utils/CsvHelper';
import {ExcelHelper} from '../src/utils/ExcelHelper';
import {JsonHelper} from '../src/utils/JsonHelper';

import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginPage();
});

test('Login page title - test', async ({loginPage}) => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title',pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('Forgotten pwd link - test', async ({loginPage}) => {
    expect(await loginPage.isForgottenPwdLinkExists()).toBeTruthy();
});

test('user is able to login to the app with valid credentials - test', async ({loginPage, homePage}) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);          // Environment file data
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

// Pros : Light weight, easy to maintain/read, 3rd party library is available (csv-parse), best for large set of data
// DD_1: read csv data from csv file and loop the test method row wise....
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for(let row of testCSVData) {
    test(`user is trying to login to the app with invalid credentials with CSV Data - ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {
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
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

// Pros: light weight, light weight compared to xlsx, inbuild methods are available, best for smaller set of data
// DD_3: read JSON data from .json file and loop the test method row wise....
let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');
for(let row of testJsonData) {
    test(`user is trying to login to the app with invalid credentials with Json data- ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}