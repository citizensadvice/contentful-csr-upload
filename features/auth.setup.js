import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://be.contentful.com/login/");
  await page.getByLabel("Email").fill(process.env.CONTENTFUL_USERNAME);
  await page.getByLabel("Password").fill(process.env.CONTENTFUL_PASSWORD);
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL(
    "https://app.contentful.com/spaces/j9d3gn48j4iu/views/entries",
  );
  await expect(page.getByRole("button", { name: "Apps" })).toBeVisible();

  const cookieButton = page.getByRole("button", { name: "Accept All" });
  if (await cookieButton.isVisible()) {
    await cookieButton.click();
  }

  await page.goto(
    `https://app.contentful.com/spaces/j9d3gn48j4iu/environments/master/apps/app_installations/${process.env.CONTENTFUL_APP_DEF_ID}/`,
  );

  await page.context().storageState({ path: authFile });
});
