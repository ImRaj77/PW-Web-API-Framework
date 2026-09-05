
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

test('user is able to login to th app - test', async ({loginPage, homePage}) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExists()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});