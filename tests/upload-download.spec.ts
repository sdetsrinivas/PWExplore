import { test, expect } from "../Fixtures/fixtures";
import fs from "fs/promises";
import path from "path";

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
