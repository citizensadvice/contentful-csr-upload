import { describe, expect, it, afterEach } from "vitest";

import { render, cleanup } from "@testing-library/react";
import UpdateResult from "./UpdateResult";
import {
  PARSED,
  CONTENTFUL_PUT_ERROR,
  TO_BE_PUBLISHED,
} from "../constants/supplier-status";

describe("UpdateResultComponent", () => {
  afterEach(() => cleanup());

  it("displays the missing info icon when the status is unrecognised", () => {
    const { getByText } = render(<UpdateResult status={PARSED} />);
    expect(getByText("—")).toBeTruthy();
  });

  it("displays an OK message when there is no error", () => {
    const { getByText } = render(<UpdateResult status={TO_BE_PUBLISHED} />);
    expect(getByText("OK")).toBeTruthy();
  });

  it("displays an error message when there is an error", () => {
    const { getByText } = render(
      <UpdateResult status={CONTENTFUL_PUT_ERROR} />,
    );
    expect(getByText("Errors during update")).toBeTruthy();
  });
});
