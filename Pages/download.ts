import { Locator, Page } from "@playwright/test";

export class DownloadPage {
  readonly page: Page;
  readonly txtFld: Locator;
  readonly generateBtn: Locator;
  readonly downloadLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtFld = this.page.locator("#textbox");
    this.generateBtn = this.page.locator("#createTxt");
    this.downloadLink = this.page.locator("#link-to-download");
  }

  async navigate() {
    // Use Playwright config baseURL
    await this.page.goto("/FileDownload.html");
  }

  async enterText(text: string) {
    await this.txtFld.click();
    // Clear the field first
    await this.txtFld.fill("");
    await this.page.keyboard.type(text);
  }

  async clickGenerate() {
    await this.generateBtn.click();
  }

  async clickDownload() {
    await this.downloadLink.click();
  }
}
