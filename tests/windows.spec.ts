import { test, expect } from "../Fixtures/fixtures";

test("verify user can verify url of newly opened tab", async ({
  page,
  windows,
}) => {
  await windows.navigate();
  const [newTab] = await Promise.all([
    page.waitForEvent("popup"),
    windows.clickClickBtn(),
  ]);
  await newTab.waitForLoadState();
  expect(newTab.url()).toBe("https://www.selenium.dev/");
  await newTab.close();
});

test("verify user can verify url of newly opened window", async ({
  page,
  windows,
}) => {
  await windows.navigate();
  await windows.clickNewBrowserWindowLink();
  const [newWindowPage] = await Promise.all([
    page.waitForEvent("popup"),
    windows.clickClickBtn(),
  ]);
  await newWindowPage.waitForLoadState();
  expect(newWindowPage.url()).toBe("https://www.selenium.dev/");
  await newWindowPage.close();
  //sleep for 3 seconds
  await page.waitForTimeout(3000);
});

test("verify user can handle multiple tabs", async ({ page, windows }) => {
  await windows.navigate();
  await windows.clickMultipleWindowsLink();

  // Attach a popup listener, trigger the click, then wait until two popups are collected.
  const popups: (typeof page)[] = [];
  const onPopup = (p: any) => popups.push(p);
  page.on("popup", onPopup);

  await windows.clickClickBtn();

  // Poll for collected popups (short timeout) because both popups may open quickly.
  const start = Date.now();
  while (popups.length < 2 && Date.now() - start < 5000) {
    // small delay
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 100));
  }

  // Stop listening
  page.off("popup", onPopup);

  if (popups.length < 2) {
    throw new Error("Did not receive two popups within timeout");
  }

  const [newWindowPage1, newWindowPage2] = [popups[0], popups[1]];

  await Promise.all([
    newWindowPage1.waitForLoadState(),
    newWindowPage2.waitForLoadState(),
  ]);

  console.log("New Window 1 URL: " + newWindowPage1.url());
  await newWindowPage1.bringToFront();
  //sleep for 5 seconds
  await page.waitForTimeout(5000);
  await newWindowPage2.bringToFront();
  //sleep for 5 seconds
  await page.waitForTimeout(5000);
  console.log("New Window 2 URL: " + newWindowPage2.url());
});

test("verify user can handle multiple tabs using browser context", async ({
  windows,
  page,
  context,
}) => {
  await windows.navigate();
  await windows.clickMultipleWindowsLink();
  await windows.clickClickBtn();

  const pages = context.pages();

  //Just added waits to see all pages are loaded
  console.log(pages.length);
  console.log(pages[0].url());
  console.log(pages[1].url());
  console.log(pages[2].url());
  await pages[0].bringToFront();
  await page.waitForTimeout(2000);
  await pages[1].bringToFront();
  await page.waitForTimeout(2000);
  await pages[2].bringToFront();
});
