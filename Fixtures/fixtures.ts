// Implementing custom fixtures here
import { test as base, expect, type TestInfo } from "@playwright/test";
import { promises as fsp } from "fs";
import path from "path";
import { RegisterPage } from "../Pages/register";
import { UploadPage } from "../Pages/upload";
import { DownloadPage } from "../Pages/download";

type pages = {
  // Define any custom fixtures here if needed
  register: RegisterPage;
  upload: UploadPage;
  download: DownloadPage;
  downloadPath: string;
};

export const test = base.extend<pages>({
  register: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  upload: async ({ page }, use) => {
    await use(new UploadPage(page));
  },
  download: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },
  downloadPath: async ({}, use, testInfo) => {
    const downloadDir = testInfo.outputPath("downloads");
    await fsp.mkdir(downloadDir, { recursive: true });

    // Optionally clean it (should be empty anyway, but safe)
    const files = await fsp.readdir(downloadDir);
    await Promise.all(
      files.map((file) => fsp.unlink(path.join(downloadDir, file)))
    );

    await use(downloadDir);
  },
});

export { expect };
