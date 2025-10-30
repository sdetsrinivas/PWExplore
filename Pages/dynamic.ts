import { Page, Locator } from "@playwright/test";

export class DynamicPage {
  readonly page: Page;
  readonly generateBtn: Locator;
  readonly personImg: Locator;
  readonly personData: Locator;

  constructor(page: Page) {
    this.page = page;
    this.generateBtn = this.page.getByRole("button", {
      name: "Get Dynamic Data",
    });
    this.personImg = this.page.locator("div#loading>img[src*=random]");
    this.personData = this.page.locator("div#loading");
  }

  async navigate() {
    await this.page.goto("/DynamicData.html");
  }
  async clickClickBtn() {
    await this.generateBtn.click();
  }
}
