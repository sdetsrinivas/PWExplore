// Implementing custom fixtures here
import { test as base, expect } from "@playwright/test";
import fs from "fs"; // for existsSync
import { promises as fsp } from "fs";
import path from "path";

export const test = base.extend({});

// Prepare a clean Downloads directory before each test that uses our `test`
test.beforeEach(async () => {
  const downloadDir = path.resolve("./Downloads");

  // Create directory if it doesn't exist
  if (!fs.existsSync(downloadDir)) {
    await fsp.mkdir(downloadDir, { recursive: true });
  }

  // Remove all files (non-recursive) inside the download directory
  const files = await fsp.readdir(downloadDir);
  for (const file of files) {
    await fsp.unlink(path.join(downloadDir, file));
  }
});

export { expect };
