import { test, expect } from "@playwright/test";
import { StartPage } from "./pages/start-page";
import { dismissSurvey } from "./utils/dismissSurvey";

test("upload well formed data and schedule changes", async ({ page }) => {
  const startPage = new StartPage(page);
  await startPage.goTo();

  // app is the iframe that contains our app under test
  const app = await startPage.getApp();
  await startPage.uploadData("../fixtures/good-test-data.csv");

  // check upload is successful
  await expect(app.getByText("Found 3 suppliers")).toBeVisible();

  // proceed to match screen
  await app.getByRole("button", { name: "Next" }).click();
  await expect(app.getByText("Ranked Suppliers (2)")).toBeVisible();
  await expect(app.getByText("Small Suppliers (1)")).toBeVisible();

  // proceed to process screen
  await app.getByRole("button", { name: "Match suppliers" }).click();
  await expect(app.getByText("3 suppliers will be updated")).toBeVisible();

  // proceed to schedule screen
  await dismissSurvey(page);
  await app.getByRole("button", { name: "Process suppliers" }).click();
  await expect(app.getByText("3 suppliers will be published")).toBeVisible({
    timeout: 60000,
  });

  // schedule update in the past
  const oneHourAgo = new Date().getHours() - 1;
  const minutes = new Date().getMinutes();
  await app
    .getByRole("textbox", { name: "Enter time" })
    .fill(`${oneHourAgo}:${minutes}`);

  await dismissSurvey(page);
  await app.getByRole("button", { name: "Schedule Update" }).click();

  // check errors are displayed
  const errors = app.getByText("Error");
  await expect(errors).toHaveCount(3, { timeout: 60000 });

  // check modal opens with error message
  await errors.first().click();
  await expect(
    app.getByText('"scheduledFor.datetime" must be in the future'),
  ).toBeVisible();
});
