
import {test, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;


test.beforeEach( async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.doLogin('raz@pw.com', 'pw@123');
    homePage = new HomePage(page);
});


test.skip('Home page title test', async() => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title',pageTitle);
    expect(pageTitle).toBe('My Account');
});


test.skip('Logout link exists or not', async () => {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});


test.skip('Home page headers exists or not', async () => {
    let allHeaders : string[] = await homePage.getHomePageHeaders();
    console.log('Home page headers',allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);                             // here the sequence should be in the same order as its index based array
});