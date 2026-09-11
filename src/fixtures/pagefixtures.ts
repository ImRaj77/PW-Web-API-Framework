
import {test as baseTest} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type pageFixtures = {
    basePage : BasePage,
    loginPage : LoginPage,
    homePage : HomePage,
    searchResultsPage : SearchResultsPage,
    productInfoPage : ProductInfoPage
}

// extend playwright test :  using basetest.extends : inheritance
export let test = baseTest.extend<pageFixtures>({

    basePage : async ({page}, use) => {                 // use :-> default export 
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage : async ({page}, use) => {                 // use :-> default export 
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage : async ({page}, use) => {                 // use :-> default export 
        let homePage = new HomePage(page);
        await  use(homePage);
    },

    searchResultsPage : async ({page}, use) => {                 // use :-> default export 
        let searchResultsPage = new SearchResultsPage(page);
        await  use(searchResultsPage);
    },

    productInfoPage : async ({page}, use) => {                 // use :-> default export 
        let productInfoPage = new ProductInfoPage(page);
        await  use(productInfoPage);
    }
});

export {expect} from '@playwright/test';


