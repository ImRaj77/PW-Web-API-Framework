
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // Private Locators
    private readonly logoutLink : Locator ;
    private readonly headers : Locator ;

    // constructor of the class to initialise the locators
    constructor(page : Page) {
        super(page);
        this.logoutLink = page.getByRole('link', {name : 'Logout'});
        this.headers = page.getByRole('heading', {level : 2});
    }

    //
    async isLogoutLinkExists() : Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders() : Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async getHomePageTitle() : Promise<String> {
        return await this.page.title();
    }
}