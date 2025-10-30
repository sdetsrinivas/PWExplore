import { test, expect } from "../Fixtures/fixtures";

test("verify user is able to see the Admin option in the menu after login", async ({
  orangeCrmDashboard,
}) => {
  await expect(orangeCrmDashboard.adminTab).toBeVisible();
});

test("verify user is able to see the Recruitment option in the menu after login", async ({
  orangeCrmDashboard,
}) => {
  await expect(orangeCrmDashboard.recruitmentTab).toBeVisible();
});
