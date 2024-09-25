export const dismissSurvey = async (page) => {
  const survey = page.locator(".iterate__survey");
  const surveyPopup = page.locator(".iterate__closeButton");
  if (await surveyPopup.isVisible()) {
    console.log("dismissing survey...");
    await surveyPopup.click();
    await survey.waitFor("hidden");
  }
};
