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
