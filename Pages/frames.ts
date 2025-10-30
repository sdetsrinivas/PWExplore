import { Page, Locator } from "@playwright/test";

export class FramesPage {
  readonly page: Page;
  readonly iframeTab: Locator;
  readonly singleFrameTxtBox: Locator;
  readonly nestedFramesTxtBox: Locator;
  readonly alternateTextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iframeTab = this.page.getByRole("link", {
      name: "Iframe with in an Iframe",
    });
    this.singleFrameTxtBox = this.page
      .frameLocator("#singleframe")
      .getByRole("textbox");
    this.nestedFramesTxtBox = this.page
      .frameLocator("iframe[src='MultipleFrames.html']")
      .frameLocator("iframe[src='SingleFrame.html']")
      .getByRole("textbox");
    this.alternateTextBox = this.page
      .locator("#singleframe")
      .contentFrame()
      .getByRole("textbox");
  }

  async navigate() {
    await this.page.goto("/Frames.html");
  }

  async clickIframeTab() {
    await this.iframeTab.click();
  }
  async enterTextInSingleFrame(text: string) {
    await this.singleFrameTxtBox.fill(text);
  }
  async enterTextInNestedFrame(text: string) {
    await this.nestedFramesTxtBox.fill(text);
  }
  async enterTextInAlternateWay(text: string) {
    await this.alternateTextBox.fill(text);
  }
}
