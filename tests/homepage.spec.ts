
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach( async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


test('Home page title test', async({homePage}) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title',pageTitle);
    expect(pageTitle).toBe('My Account');
});


test('Logout link exists or not', async ({homePage}) => {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});


test('Home page headers exists or not', async ({homePage}) => {
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