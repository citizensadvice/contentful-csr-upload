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

  // schedule update
  const hour = new Date().getHours();
  const oneMinuteFromNow = new Date().getMinutes() + 1;
  await app
    .getByRole("textbox", { name: "Enter time" })
    .fill(`${hour}:${oneMinuteFromNow}`);

  await dismissSurvey(page);
  await app.getByRole("button", { name: "Schedule Update" }).click();

  await expect(app.getByText("0 suppliers will be published")).toBeVisible({
    timeout: 60000,
  });
});
