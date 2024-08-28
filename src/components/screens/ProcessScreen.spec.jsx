import { describe, expect, it, vi } from "vitest";

import { renderWithProvider } from "../../../test/utils/render-with-provider";
import ProcessScreen from "./ProcessScreen";
import { FETCHING_CONTENTFUL_SUPPLIERS } from "../../constants/app-status";

vi.mock("@contentful/react-apps-toolkit", () => {
  return {
    useSDK: () => {
      return {};
    },
  };
});

// we don't want to actually call Contentful in the tests
vi.mock("../../ContentfulWrapper.js", () => {
  return {
    getPublishedSuppliers: vi.fn().mockResolvedValue({ items: [] }),
  };
});

describe("ProcessScreen component", () => {
  const { getByText } = renderWithProvider(<ProcessScreen />, {
    preloadedState: { appStatus: { value: FETCHING_CONTENTFUL_SUPPLIERS } },
  });

  it("renders the suppliers found in Contentful", () => {
    expect(getByText("Suppliers to be updated")).toBeTruthy();
  });

  it("renders the suppliers not in Contentful", () => {
    expect(getByText("Suppliers to be created")).toBeTruthy();
  });

  it("renders the suppliers not in the file", () => {
    expect(getByText("Suppliers to be unpublished")).toBeTruthy();
  });
});
