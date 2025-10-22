import { test, expect } from "../Fixtures/fixtures";
import fs from "fs/promises";
import path from "path";

test("Verify user can enter first and last name", async ({ register }) => {
  await register.navigate();
  await register.enterFirstName("John");
  await register.enterLastName("Doe");

  await expect(register.firstName).toHaveValue("John");
  await expect(register.lastName).toHaveValue("Doe");
});

test("Verify user is able to select english and French langugage from autocomplete textBox", async ({
  register,
}) => {
  await register.navigate();

  await register.clickLanguage();

  await register.selectLanguage("English");
  await register.selectLanguage("French");

  await expect(register.language).toHaveText(/English/);
  await expect(register.language).toContainText("English");
  await expect(register.language).toHaveText(/French/);

  // Optionally, log the selected languages for debug
  console.log(await register.language.textContent());
});

test("Verify user is able to see all languages", async ({ page, register }) => {
  await register.navigate();

  await register.clickLanguage();

  // Wait for the language dropdown list to be visible using a locator for <a> inside <li>
  await expect(page.locator("li > a", { hasText: "English" })).toBeVisible({
    timeout: 5000,
  });

  await register.printLanguages();
});

test("Verify email id tooltip", async ({ register }) => {
  await register.navigate();

  await register.hoverEmail();

  await expect(register.emailTooltip).toBeVisible();
  await expect(register.emailTooltip).toHaveText(
    "Provide a valid email id for further updates"
  );
});

test("verify user can select male gender", async ({ register }) => {
  await register.navigate();
  await register.maleRadio.check();
  await expect(register.maleRadio).toBeChecked();
});

test("verify user able to download file succesfully", async ({
  page,
  register,
  download,
  downloadPath,
}) => {
  await register.navigate();
  await register.hoverMoreLink();
  await register.clickDownloadLink();
  await download.enterText("Sample text for download");
  await download.clickGenerate();
  await expect(download.downloadLink).toBeVisible();
  const [downloadEvent] = await Promise.all([
    page.waitForEvent("download"),
    download.clickDownload(),
  ]);
  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}-${downloadEvent.suggestedFilename()}`;
  const savePath = path.join(downloadPath, uniqueFileName);
  await downloadEvent.saveAs(savePath);
  // Validate the downloaded file exists
  const fileExists = await fs
    .access(savePath)
    .then(() => true)
    .catch(() => false);
  expect(fileExists).toBeTruthy();
});

test("verify user able to upload file succesfully", async ({
  register,
  upload,
}) => {
  await register.navigate();
  await register.hoverMoreLink();
  await register.clickFileUploadLink();
  //Upload the file using method 1
  const filePath = path.resolve("./Resources", "dosa.jpeg");
  await upload.uploadFile(filePath);
});

test("verify user able to upload file using file chooser", async ({
  page,
  register,
}) => {
  await register.navigate();
  const filePath = path.resolve("./Resources", "dosa.jpeg");
  //Upload the file using method 2
  const [uploadFiles] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.getByRole("button", { name: "Choose File" }).click(), // Triggers the file chooser
  ]);
  await uploadFiles.setFiles(filePath);
});
