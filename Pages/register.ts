import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly language: Locator;

    constructor(page: Page) {
         this.page = page;
         this.firstName = this.page.getByPlaceholder('First Name');
         this.lastName = this.page.getByPlaceholder('Last Name');
         this.language = this.page.locator('#msdd');
}

    async navigate() {
      // Use Playwright config baseURL
      await this.page.goto('/Register.html');
    }

    async enterFirstName(firstName: string) {
      await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string) {
      await this.lastName.fill(lastName);
    }

    async clickLanguage() {
      await this.language.click();
    }

    async selectLanguage(language: string) {
      await this.language.click();
      await this.page.getByRole('listitem').filter({ hasText: language }).click();
    }

    async printLanguages() {
      const languages = await this.page.locator('#msdd+div li>a');
      console.log(`Total languages found: ${await languages.count()}`);
      for( let language of await languages.all()) {
        console.log(await language.textContent());
      }
    }

}