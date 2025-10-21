import { Page, Locator } from "@playwright/test";

export class UploadPage {
  readonly page: Page;
  readonly fileInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = this.page.locator('input[type="file"]');
  }

  async navigate() {
    await this.page.goto("/FileUpload.html");
  }

  async uploadFile(filePath: string) {
    const fileInput = this.page.locator(".file-input #input-4");
    await fileInput.setInputFiles(filePath);
  }
}
