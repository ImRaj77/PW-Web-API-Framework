
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    // Private Locators
    private readonly header : Locator;
    private readonly productImages : Locator;
    private readonly productMetaData : Locator;
    private readonly productPricingData : Locator;

    // Map 
    private productInfoMap : Map<string, string | number>;

    // constructor of the class to initialise the locators
    constructor(page : Page) {
        super(page);
        this.header = page.getByRole('heading', {level: 1});
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricingData = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');

        // Map initialisation
        this.productInfoMap = new Map<string, string | number>();
    };

    // Page Actions
    async getProductHeader() : Promise<string>{
        return this.header.innerText();
    }

    async getProductImagesCount() : Promise<number> {
        await this.productImages.first().waitFor({state:'visible'});
        return await this.productImages.count();
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaDta() : Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productInfoMap.set(metaKey, metaValue);
        }
        
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricing() : Promise<void> {
        let pricingData = await this.productPricingData.allInnerTexts();
        let productPrice = pricingData[0].trim();
        let exTaxPrice = pricingData[1].split(':')[1].trim();
        // we can create our own key
        this.productInfoMap.set('productPrice', productPrice);
        this.productInfoMap.set('exTaxPrice', exTaxPrice);
    }


    async getProductInfo() : Promise<Map<string, string | number>> {
        this.productInfoMap.set('productHeader', await this.getProductHeader());
        this.productInfoMap.set('productImagesCount', await this.getProductImagesCount());
        await this.getProductMetaDta();
        await this.getProductPricing();
        return this.productInfoMap;
    }

}