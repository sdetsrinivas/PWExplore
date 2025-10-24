import { test, expect } from "../Fixtures/fixtures";

test("verify user is able to accept the alert", async ({ page, alert }) => {
  await alert.navigate();
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("I am an alert box!");
    await dialog.accept();
  });
  await alert.clickAlertButton();
});

test("verify user is able to dismiss a alert", async ({ page, alert }) => {
  console.log(test.info().title);
  await alert.navigate();
  await alert.clickAlertTwoOptionsLink();
  page.on("dialog", async (dialog) => {
    console.log("Alert message: " + dialog.message());
    expect(dialog.message()).toBe("Press a Button !");
    await dialog.dismiss();
  });
  await alert.clickAlertTwoOptionsButton();
});

test("verify user is able to enter text and accept button", async ({
  page,
  alert,
}) => {
  console.log(test.info().title);
  await alert.navigate();
  await alert.clickAlertWithTextBoxLink();
  page.on("dialog", async (dialog) => {
    console.log("Alert message: " + dialog.message());
    expect(dialog.message()).toBe("Please enter your name");
    await dialog.accept("Murugan");
  });
  await alert.clickAlertWithTextBoxButton();
});
