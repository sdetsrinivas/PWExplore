import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly language: Locator;
  readonly emailId: Locator;
  readonly emailTooltip: Locator;
  readonly maleRadio: Locator;
  readonly downloadLink: Locator;
  readonly moreLink: Locator;
  readonly fileUploadLnk: Locator;
  readonly thumbnailUploadLnk: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.language = this.page.locator("#msdd");
    this.emailId = this.page.locator("input[type=email]");
    this.emailTooltip = this.page.locator("div[class*='tooltpte']");
    this.maleRadio = this.page.getByRole("radio", {
      name: "Male",
      exact: true,
    });
    this.downloadLink = this.page.getByRole("link", { name: "File Download" });
    this.moreLink = this.page.getByRole("link", { name: "More" });
    this.fileUploadLnk = this.page.getByRole("link", { name: "File Upload" });
    this.thumbnailUploadLnk = this.page.getByRole("button", {
      name: "Choose File",
    });
  }

  async navigate() {
    // Use Playwright config baseURL
    await this.page.goto("/Register.html");
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
    await this.page.getByRole("listitem").filter({ hasText: language }).click();
  }

  async printLanguages() {
    const languages = await this.page.locator("#msdd+div li>a");
    console.log(`Total languages found: ${await languages.count()}`);
    for (let language of await languages.all()) {
      console.log(await language.textContent());
    }
  }
  async clickDownloadLink() {
    await this.downloadLink.click();
  }

  async hoverEmail() {
    await this.emailId.hover();
  }

  async hoverMoreLink() {
    await this.moreLink.hover();
  }

  async clickFileUploadLink() {
    await this.fileUploadLnk.click();
  }
}
