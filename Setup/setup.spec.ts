import { test, expect } from "../Fixtures/fixtures";

test("user logs into the application successfully", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(
    page.locator("div").filter({ hasText: /^Dashboard$/ })
  ).toBeVisible();
  await page.context().storageState({ path: "auth/storageState.json" });
});
