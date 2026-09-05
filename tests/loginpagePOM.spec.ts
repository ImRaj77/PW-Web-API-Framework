
// never create the class

import {test, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    homePage = new HomePage(page);
});

test.skip('Login page title - test', async () => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title',pageTitle);
    expect(pageTitle).toBe('Account Login');
});


test.skip('Forgotten pwd link - test', async () => {
    expect(await loginPage.isForgottenPwdLinkExists()).toBeTruthy();
});

test.skip('user is able to login to th app - test', async () => {
    await loginPage.doLogin('raz@pw.com','pw@123');
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});
