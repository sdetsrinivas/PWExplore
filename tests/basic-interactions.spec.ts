import { test, expect } from "../Fixtures/fixtures";

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

  console.log(await register.language.textContent());

  //Selecting by array of languages if there are multiple selections
  //await page.getByRole("listitem").selectOption(["Arabic", "Dutch", "Hindi"]);
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

test("verify user can select a given skill dropdown", async ({ register }) => {
  await register.navigate();
  await register.skillsDropdown.selectOption("Java");
  await expect(register.skillsDropdown).toHaveValue("Java");
});
