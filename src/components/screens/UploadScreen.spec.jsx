import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";

import { renderWithProvider } from "../../../test/utils/render-with-provider";
import UploadScreen from "./UploadScreen";

import wellFormedFile from "../../../test/fixtures/well-formed-csv-file";
import badlyFormedFile from "../../../test/fixtures/badly-formed-csv-file";

describe("UploadScreen component", () => {
  const { getByLabelText, getByText } = renderWithProvider(<UploadScreen />);

  it("displays a file upload", () => {
    expect(getByLabelText("Choose a .csv file")).toBeTruthy();
  });

  it("parses a well formed csv file with supplier data", async () => {
    const fileInput = getByLabelText("Choose a .csv file");
    const user = userEvent.setup();

    await user.upload(fileInput, wellFormedFile);

    expect(getByText("Found 4 suppliers")).toBeTruthy();
  });

  it("reports errors in a badly formed csv file", async () => {
    const fileInput = getByLabelText("Choose a .csv file");
    const user = userEvent.setup();

    await user.upload(fileInput, badlyFormedFile);

    expect(getByText(/Found 2 problems/)).toBeTruthy();
    expect(
      getByText(/Row 3 - Too few fields: expected 21 fields but parsed 3/),
    ).toBeTruthy();
    expect(
      getByText(/Row 4 - Too many fields: expected 21 fields but parsed 60/),
    ).toBeTruthy();
  });
});
