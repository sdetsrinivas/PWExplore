import { test, expect } from "../Fixtures/fixtures";
import { Common } from "../Utils/common";
import path from "path";

const userName = require("../Resources/users.json");

const users = [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Jane", lastName: "Smith" },
  { firstName: "Alice", lastName: "Johnson" },
];

users.forEach((user) => {
  test(`Verify user can enter ${user.firstName} and  ${user.lastName} from a simple array of objects`, async ({
    register,
  }) => {
    await register.navigate();
    await register.enterFirstName(user.firstName);
    await register.enterLastName(user.lastName);

    await expect(register.firstName).toHaveValue(user.firstName);
    await expect(register.lastName).toHaveValue(user.lastName);
  });
});

for (const user of userName.users) {
  test(`Verify user can enter ${user.firstName} and  ${user.lastName} from a external JSON file`, async ({
    register,
  }) => {
    await register.navigate();
    await register.enterFirstName(user.firstName);
    await register.enterLastName(user.lastName);

    await expect(register.firstName).toHaveValue(user.firstName);
    await expect(register.lastName).toHaveValue(user.lastName);
  });
}

const userFromCsv = Common.readCsv(
  path.join(__dirname, "../Resources/users.csv")
);

userFromCsv.then((users: any[]) => {
  for (const user of users) {
    test(`Verify user can enter ${user.firstName} and  ${user.lastName} from a external CSV file`, async ({
      register,
    }) => {
      await register.navigate();
      await register.enterFirstName(user.firstName);
      await register.enterLastName(user.lastName);

      await expect(register.firstName).toHaveValue(user.firstName);
      await expect(register.lastName).toHaveValue(user.lastName);
    });
  }
});
