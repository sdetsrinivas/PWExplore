import { test, expect } from "../Fixtures/fixtures";

test("verify user can verify generated data using spinner state", async ({
  dynamic,
}) => {
  await dynamic.navigate();
  await dynamic.clickClickBtn();
  await dynamic.spinnerImg.waitFor({ state: "visible" });
  await dynamic.spinnerImg.waitFor({ state: "hidden" });
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();

  //Verify the text contain the regrex  pattern for first name that starts with capital letter
  const firstPersonName = await dynamic.personData.textContent();

  const firstNamePattern = /First Name\s*:\s*([A-Z][a-zA-Z]*)(?=Last Name|$)/;
  const lastNamePattern = /Last Name\s*:\s*([A-Z][a-zA-Z]*)/;

  expect(firstPersonName!).toMatch(firstNamePattern);
  expect(firstPersonName!).toMatch(lastNamePattern);

  console.log(await dynamic.personData.textContent());
  await dynamic.clickClickBtn();
  await dynamic.spinnerImg.waitFor({ state: "visible" });
  await dynamic.spinnerImg.waitFor({ state: "hidden" });
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();

  const secondPersonName = await dynamic.personData.textContent();
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();

  expect(secondPersonName!).toMatch(firstNamePattern);
  expect(secondPersonName!).toMatch(lastNamePattern);
});

test("verify user can validate the dynamic content ", async ({
  page,
  dynamic,
}) => {
  await dynamic.navigate();
  await dynamic.clickClickBtn();
  await expect(dynamic.personImg).toBeVisible();
  await expect(dynamic.personData).toBeVisible();
  const firstPersonName = await dynamic.personData.textContent();
  await dynamic.clickClickBtn();
  await page.waitForFunction(
    (oldContent) => {
      const newContent = document.querySelector("div#loading")?.textContent;
      return newContent && newContent !== oldContent;
    },
    firstPersonName,
    { timeout: 5000 } // 10 seconds
  );
  const secondPersonName = await dynamic.personData.textContent();
  console.log("First Person Data: " + firstPersonName);
  console.log("Second Person Data: " + secondPersonName);
  expect(firstPersonName).not.toBe(secondPersonName);
});
