
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach( async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


// Data Provider :
let productData = CsvHelper.readCsv('src/testdata/product.csv');
for(let row of productData) {
    test(`verify the search result count test - ${row.searchkey} - ${row.productname}`, async ({homePage, searchResultsPage}) => {
        await homePage.searchProduct(row.searchkey);
        let actualResultCount = await searchResultsPage.getProductSearchResultsCount();
        console.log('Search results count:',actualResultCount);
        expect.soft(actualResultCount).toBe(Number(row.resultcount));
        expect(actualResultCount).toBeGreaterThan(0);
    });
}

for(let row of productData) {
    test(`verify the use ris able to land on the product page test - ${row.searchkey} - ${row.productname}`, async({page, homePage, searchResultsPage}) => {
        await homePage.searchProduct(row.searchkey);
        await searchResultsPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
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