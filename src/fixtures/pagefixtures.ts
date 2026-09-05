
import {test as baseTest} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

type pageFixtures = {
    basePage : BasePage,
    loginPage : LoginPage,
    homePage : HomePage
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
    }
});

export {expect} from '@playwright/test';


