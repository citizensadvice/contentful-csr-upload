import { test } from "@playwright/test";
import path from "path";
import pollForIframe from "./utils/poll-for-iframe";

test("upload well formed CSV file", async ({ page }) => {
  await page.goto(
    `https://app.contentful.com/spaces/${process.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/apps/app_installations/${process.env.CONTENTFUL_APP_DEF_ID}/`,
  );

  // wait for iframe to load
  const app = await pollForIframe(page, "/index.html");

  // upload the csv file
  const fileChooserPromise = page.waitForEvent("filechooser");
  await app.getByText("Choose a .csv file").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    path.join(__dirname, "./fixtures/good-test-data.csv"),
  );

  // check upload is successful
  await app.getByText("Found 2 suppliers");

  // move to match screen
  await app.getByRole("button", { name: "Next" }).click();
});
