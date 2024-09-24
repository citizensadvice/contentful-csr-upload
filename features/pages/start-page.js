import pollForIframe from "../utils/poll-for-iframe";
import path from "path";

export class StartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto(
      `https://app.contentful.com/spaces/${process.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/apps/app_installations/${process.env.CONTENTFUL_APP_DEF_ID}/`,
    );
  }

  async getApp() {
    // wait for iframe to load
    // app is the iframe that contains the actual app under test
    this.app = await pollForIframe(this.page, "/index.html");
    return this.app;
  }

  async uploadData(filePath) {
    // upload the csv file
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.app.getByText("Choose a .csv file").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, filePath));
  }
}
