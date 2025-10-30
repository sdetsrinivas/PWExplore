import { test, expect } from "../Fixtures/fixtures";

test("verify user can verify generated data", async ({ dynamic, page }) => {
  await dynamic.navigate();
  await dynamic.clickClickBtn();
  await Promise.all([
    page.waitForLoadState("domcontentloaded"),
    dynamic.personImg.waitFor({ state: "visible" }),
    dynamic.personData.waitFor({ state: "visible" }),
  ]);
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();

  console.log(await dynamic.personData.textContent());

  //Verify the text contain the regrex  pattern for first name that starts with capital letter
  const firstPersonName = await dynamic.personData.textContent();

  const firstNamePattern = /First Name\s*:\s*([A-Z][a-zA-Z]*)(?=Last Name|$)/;
  const lastNamePattern = /Last Name\s*:\s*([A-Z][a-zA-Z]*)/;

  expect(firstPersonName!).toMatch(firstNamePattern);
  expect(firstPersonName!).toMatch(lastNamePattern);

  //Print first and last name
  const firstName = firstPersonName!.match(firstNamePattern)?.[1];
  const lastName = firstPersonName!.match(lastNamePattern)?.[1];

  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);

  await dynamic.clickClickBtn();
  await Promise.all([
    page.waitForLoadState("domcontentloaded"),
    dynamic.personImg.waitFor({ state: "visible" }),
    dynamic.personData.waitFor({ state: "visible" }),
  ]);

  const secondPersonName = await dynamic.personData.textContent();
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();

  expect(secondPersonName!).toMatch(firstNamePattern);
  expect(secondPersonName!).toMatch(lastNamePattern);
});
