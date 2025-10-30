import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly adminTab: Locator;
  readonly recruitmentTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminTab = this.page.getByRole("link", { name: "Admin" });
    this.recruitmentTab = this.page.getByRole("link", { name: "Recruitment" });
  }

  async navigate() {
    await this.page.goto("/Frames.html");
  }
}
