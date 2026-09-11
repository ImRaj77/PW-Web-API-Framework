
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach( async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


test('verify the search result count test', async ({homePage, searchResultsPage}) => {
    await homePage.searchProduct('macbook');
    let resultCount = await searchResultsPage.getProductSearchResultsCount();
    console.log('Search results count:',resultCount);
    expect.soft(resultCount).toBe(3);
    expect(resultCount).toBeGreaterThan(0);
});


test('verify the use ris able to land on the product page test', async({page, homePage, searchResultsPage}) => {
    await homePage.searchProduct('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await page.title()).toBe('MacBook Pro');
});