
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach( async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


test('@smoke Home page title test', async({homePage}) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title',pageTitle);
    expect(pageTitle).toBe('My Account');
});


test('@smoke Logout link exists or not', async ({homePage}) => {
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
});


test('@regression Home page headers exists or not', async ({homePage}) => {
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

// Common features tests 
test('@smoke Application logo exists or not on the login page', async({basePage}) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke Searchbox is visible or not on the login page', async({basePage}) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Cart exists on the login page or not', async({basePage}) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('@smoke Footers exists on the login page or not', async({basePage}) => {
    expect(await basePage.getPageFootersCount()).toBeGreaterThan(0);
});