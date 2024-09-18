import { describe, expect, it, vi } from "vitest";

import { renderWithProvider } from "../../../test/utils/render-with-provider";
import ScheduleScreen from "./ScheduleScreen";
import {
  PROCESS_SUPPLIERS,
  PROCESSED_SUPPLIERS,
} from "../../constants/app-status";

import {
  suppliers,
  contentfulSuppliers,
} from "../../../test/fixtures/schedule-screen-state";
import { createSupplier, updateSupplier } from "../../ContentfulWrapper";
import { cleanup } from "@testing-library/react";

vi.mock("../../ContentfulWrapper.js", () => {
  return {
    createSupplier: vi.fn().mockResolvedValue({ sys: { id: "1234" } }),
    updateSupplier: vi.fn().mockResolvedValue({}),
  };
});

vi.mock("@contentful/react-apps-toolkit", () => {
  return {
    useSDK: () => {
      return {
        navigator: {
          openEntry: vi.fn(),
        },
      };
    },
  };
});

describe("ScheduleScreen component", () => {
  renderWithProvider(<ScheduleScreen />, {
    preloadedState: {
      suppliers: { value: suppliers },
      contentfulSuppliers: { value: contentfulSuppliers },
      appStatus: { value: PROCESS_SUPPLIERS },
    },
  });

  it("creates a supplier for each supplier in the spreadsheet but not in Contentful", () => {
    expect(createSupplier).toHaveBeenCalledTimes(3);
  });

  it("updates a supplier for each supplier in the spreadsheet but not in Contentful", () => {
    expect(updateSupplier).toHaveBeenCalledTimes(3);
  });

  it("doesn't create or update anything unless the app status is 'PROCESSING_SUPPLIERS'", () => {
    cleanup();
    vi.resetAllMocks();
    renderWithProvider(<ScheduleScreen />, {
      preloadedState: {
        suppliers: { value: suppliers },
        contentfulSuppliers: { value: contentfulSuppliers },
        appStatus: { value: PROCESSED_SUPPLIERS },
        contentfulErrors: { value: [] },
      },
    });

    expect(createSupplier).toHaveBeenCalledTimes(0);
    expect(updateSupplier).toHaveBeenCalledTimes(0);
  });
});
