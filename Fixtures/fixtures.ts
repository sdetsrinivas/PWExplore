// Implementing custom fixtures here
import { test as base, expect, type TestInfo } from "@playwright/test";
import { promises as fsp } from "fs";
import path from "path";
import { RegisterPage } from "../Pages/register";
import { UploadPage } from "../Pages/upload";
import { DownloadPage } from "../Pages/download";
import { AlertPage } from "../Pages/alert";
import { WindowsPage } from "../Pages/windows";
import { FramesPage } from "../Pages/frames";
import { DynamicPage } from "../Pages/dynamic";
import { DashboardPage } from "../Pages/dashboard";

type pages = {
  // Define any custom fixtures here if needed
  register: RegisterPage;
  upload: UploadPage;
  download: DownloadPage;
  alert: AlertPage;
  windows: WindowsPage;
  downloadPath: string;
  frames: FramesPage;
  dynamic: DynamicPage;
  orangeCrmDashboard: DashboardPage;
};

export const test = base.extend<pages>({
  //Extend the exsting fixture page to handle JS error
  //Disabling this fixture as some pages may have JS errors
  // page: async ({ page }, use) => {
  //   const errors: Array<string> = [];
  //   // Listen for console messages
  //   page.on("pageerror", (msg) => {
  //     errors.push(msg.message);
  //   });
  //   await use(page);
  //   // After the test, check if there were any errors
  //   expect(errors).toHaveLength(0);
  // },

  //Page objects as fixtures
  register: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  upload: async ({ page }, use) => {
    await use(new UploadPage(page));
  },
  download: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },
  alert: async ({ page }, use) => {
    await use(new AlertPage(page));
  },
  windows: async ({ page }, use) => {
    await use(new WindowsPage(page));
  },
  frames: async ({ page }, use) => {
    await use(new FramesPage(page));
  },
  dynamic: async ({ page }, use) => {
    await use(new DynamicPage(page));
  },
  orangeCrmDashboard: async ({ page }, use) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
    await use(new DashboardPage(page));
  },

  // Download path fixture
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
