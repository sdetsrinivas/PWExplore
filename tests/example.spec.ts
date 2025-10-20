import { test, expect } from "@playwright/test";
import { RegisterPage } from "../Pages/register";

test("Verify user can enter first and last name", async ({ page }) => {
  const register = new RegisterPage(page);

  await register.navigate();
  await register.enterFirstName("John");
  await register.enterLastName("Doe");

  await expect(register.firstName).toHaveValue("John");
  await expect(register.lastName).toHaveValue("Doe");
});

test("Verify user is able to select english and French langugage from autocomplete textBox", async ({
  page,
}) => {
  const register = new RegisterPage(page);

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

test("Verify user is able to see all languages", async ({ page }) => {
  const register = new RegisterPage(page);

  await register.navigate();

  await register.clickLanguage();

  // Wait for the language dropdown list to be visible using a locator for <a> inside <li>
  await expect(page.locator("li > a", { hasText: "English" })).toBeVisible({
    timeout: 5000,
  });

  await register.printLanguages();
});

test("Verify email id tooltip", async ({ page }) => {
  const register = new RegisterPage(page);

  await register.navigate();

  await register.hoverEmail();

  await expect(register.emailTooltip).toBeVisible();
  await expect(register.emailTooltip).toHaveText(
    "Provide a valid email id for further updates"
  );
});

test("verify user can select male gender", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.navigate();
  await register.maleRadio.check();
  await expect(register.maleRadio).toBeChecked();
});
