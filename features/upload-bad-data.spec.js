import { test, expect } from "@playwright/test";
import { StartPage } from "./pages/start-page";

test("upload badly formed data and schedule changes", async ({ page }) => {
  const startPage = new StartPage(page);
  await startPage.goTo();

  // app is the iframe that contains our app under test
  const app = await startPage.getApp();
  await startPage.uploadData("../fixtures/bad-test-data.csv");

  // check upload is successful
  await expect(
    app.getByText("Found 2 problems in the .csv file"),
  ).toBeVisible();
  await expect(
    app.getByText("Too many fields: expected 21 fields but parsed 24"),
  ).toBeVisible();
  await expect(
    app.getByText("Too few fields: expected 21 fields but parsed 20"),
  ).toBeVisible();

  // check Next button is disabled
  await expect(
    app.getByRole("button", { name: "Next", disabled: true }),
  ).toBeTruthy();
});
