import { test, expect } from "../Fixtures/fixtures";

test("verify user can enter text in text box within a single iframe", async ({
  frames,
}) => {
  await frames.navigate();
  await frames.enterTextInSingleFrame("Hello Iframe");

  await expect(frames.singleFrameTxtBox).toHaveValue("Hello Iframe");
});
test("verify user can enter text in text box within nested iframes", async ({
  frames,
}) => {
  await frames.navigate();
  await frames.clickIframeTab();
  await frames.enterTextInNestedFrame("Hello Nested Iframe");

  await expect(frames.nestedFramesTxtBox).toHaveValue("Hello Nested Iframe");
});
test("verify user can enter text in text box within a single iframe using alternate way", async ({
  frames,
}) => {
  await frames.navigate();
  await frames.enterTextInAlternateWay("Hello Alternate Iframe");

  await expect(frames.alternateTextBox).toHaveValue("Hello Alternate Iframe");
});
