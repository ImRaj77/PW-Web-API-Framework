import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    // 1. Private Locators
    private readonly emailId : Locator ;
    private readonly password : Locator ;
    private readonly loginBtn : Locator ;
    private readonly forgottenPwdLink : Locator ;
    private readonly loginErrorMessage : Locator;

    // 2. Constructor of the Page class : initialise the locators
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', {name : 'E-Mail Address'});
        this.password = page.getByRole('textbox', {name : 'Password'});
        this.loginBtn = page.getByRole('button', {name : 'Login'});
        this.forgottenPwdLink = page.getByRole('link', {name : 'Forgotten Password'}).first();
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible')
    }

    // 3. Page Actions : Encapsulation

    async gotoLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async isForgottenPwdLinkExists(): Promise<boolean> {
        return await this.forgottenPwdLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`usr credentials: ${username} & ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isInvalidLoginErrorDisplayed() : Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }
}