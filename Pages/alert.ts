import { Page, Locator } from "@playwright/test";

export class AlertPage {
  readonly page: Page;
  readonly alertNormalButton: Locator;

  readonly alertTwoOptionsLnk: Locator;
  readonly alertTwoOptionsButton: Locator;

  readonly alertWithTextBoxLnk: Locator;
  readonly alertWithTextBoxButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertNormalButton = this.page.getByRole("button", {
      name: "click the button to display",
    });
    this.alertTwoOptionsLnk = this.page.getByRole("link", {
      name: "Alert with OK & Cancel",
    });
    this.alertTwoOptionsButton = this.page.getByRole("button", {
      name: "click the button to display a",
    });
    this.alertWithTextBoxLnk = this.page.getByRole("link", {
      name: "Alert with Textbox",
    });
    this.alertWithTextBoxButton = this.page.getByRole("button", {
      name: "click the button to",
    });
  }

  async navigate() {
    await this.page.goto("/Alerts.html");
  }
  async clickAlertButton() {
    await this.alertNormalButton.click();
  }

  async clickAlertTwoOptionsLink() {
    await this.alertTwoOptionsLnk.click();
  }

  async clickAlertTwoOptionsButton() {
    await this.alertTwoOptionsButton.click();
  }

  async clickAlertWithTextBoxLink() {
    await this.alertWithTextBoxLnk.click();
  }

  async clickAlertWithTextBoxButton() {
    await this.alertWithTextBoxButton.click();
  }
}
