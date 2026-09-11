
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

     // Private Locators
    private readonly searchResults : Locator ;

    // constructor of the class to initialise the locators
    constructor(page : Page) {
        super(page);
        this.searchResults = page.locator('div.product-layout');
    };

    // Page Actions
    async getProductSearchResultsCount() : Promise<number> {
        return await this.searchResults.count();
    }

    async selectProduct(productName : string) : Promise<void> {
        console.log('Selecting product:',productName);
        await this.page.getByRole('link', {name : productName, exact : true}).first().click();      // Dynamic locator
    }
}