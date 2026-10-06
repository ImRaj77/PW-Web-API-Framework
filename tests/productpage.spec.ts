
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach( async ({loginPage}) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


test('@smoke verify product header test', async({homePage, searchResultsPage, productInfoPage}) => {
    await homePage.searchProduct('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
});


test('@regression verify product images count test', async({homePage, searchResultsPage, productInfoPage}) => {
    await homePage.searchProduct('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect.soft(await productInfoPage.getProductImagesCount()).toBe(4);
    expect(await productInfoPage.getProductImagesCount()).toBeGreaterThan(0);
});


test('@regression verify the product information/data test', async ({homePage, searchResultsPage, productInfoPage}) => {
    await homePage.searchProduct('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');

    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details', actualProductInfoMap);

    // Assertions
    expect.soft(actualProductInfoMap.get('productHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productImagesCount')).toBe(4);
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfoMap.get('productPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('exTaxPrice')).toBe('$2,000.00');
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