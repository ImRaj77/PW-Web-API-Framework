
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    // Private Locators
    private readonly logoutLink : Locator ;
    private readonly headers : Locator ;
    private readonly searchBox : Locator;
    private readonly searchIcon : Locator;

    // constructor of the class to initialise the locators
    constructor(page : Page) {
        super(page);
        this.logoutLink = page.getByRole('link', {name : 'Logout'});
        this.headers = page.getByRole('heading', {level : 2});
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button');
    }

    // Page Actions
    async isLogoutLinkExists() : Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders() : Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async getHomePageTitle() : Promise<string> {
        return await this.page.title();
    }

    async searchProduct(productName : string) : Promise<void> {
        console.log('Product to search:', productName);
        await this.searchBox.fill(productName);
        await this.searchIcon.click();
    }

}