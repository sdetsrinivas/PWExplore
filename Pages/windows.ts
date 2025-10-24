import { Page, Locator } from "@playwright/test";

export class WindowsPage {
  readonly page: Page;
  readonly clickBtn: Locator;
  readonly newBrowserWindowLnk: Locator;
  readonly multipleWindowsLnk: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clickBtn = this.page.getByRole("button", {
      name: "click",
    });
    this.newBrowserWindowLnk = this.page.getByRole("link", {
      name: "Open New Seperate Windows",
    });
    this.multipleWindowsLnk = this.page.getByRole("link", {
      name: "Open Seperate Multiple Windows",
    });
  }

  async navigate() {
    await this.page.goto("/Windows.html");
  }
  async clickClickBtn() {
    await this.clickBtn.click();
  }
  async clickNewBrowserWindowLink() {
    await this.newBrowserWindowLnk.click();
  }
  async clickMultipleWindowsLink() {
    await this.multipleWindowsLnk.click();
  }
}
