import { describe, it, expect, afterEach, vi } from "vitest";
import { renderWithProvider } from "../../../test/utils/render-with-provider";

import ScheduleSidebar from "./ScheduleSidebar";
import {
  suppliers,
  contentfulSuppliers,
} from "../../../test/fixtures/schedule-sidebar-state";
import * as AppStatus from "../../constants/app-status";
import { cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { scheduleAction } from "../../ContentfulWrapper";

vi.mock("contentful-management", () => {
  return {
    createClient: vi.fn(),
  };
});

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
    scheduleAction: vi.fn().mockResolvedValue({}),
  };
});

const defaultComponentSetup = () => {
  return renderWithProvider(<ScheduleSidebar />, {
    preloadedState: {
      suppliers: { value: suppliers },
      contentfulSuppliers: { value: contentfulSuppliers },
      appStatus: { value: AppStatus.PROCESSED_SUPPLIERS },
    },
  });
};

describe("ScheduleSidebar Component", () => {
  afterEach(() => cleanup());

  it("shows the number of suppliers that will be published", () => {
    const { getByText } = defaultComponentSetup();
    expect(
      getByText(
        (_, node) => node.textContent === "3 suppliers will be published",
      ),
    ).toBeTruthy();
  });

  it("shows the number of suppliers that will be unpublished", () => {
    const { getByText } = defaultComponentSetup();
    expect(
      getByText((_, node) => node.textContent === "1 suppliers will be Draft"),
    ).toBeTruthy();
  });

  it("schedules the updates", async () => {
    const { getByRole } = defaultComponentSetup();

    const scheduleButton = getByRole("button", { name: "Schedule Update" });

    const user = await userEvent.setup();
    await user.click(scheduleButton);

    // once for each supplier to be published (3)
    // once for each supplier to be unpublished (1)
    expect(scheduleAction).toHaveBeenCalledTimes(4);
  });
});
