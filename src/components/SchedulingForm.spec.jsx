import { describe, it, expect, afterEach } from "vitest";
import { renderWithProvider } from "../../test/utils/render-with-provider";
import {
  suppliers,
  contentfulSuppliers,
} from "../../test/fixtures/schedule-sidebar-state";
import * as AppStatus from "../constants/app-status";
import { cleanup } from "@testing-library/react";
import dateFormat from "dateformat";
import { userEvent } from "@testing-library/user-event";
import SchedulingForm from "./SchedulingForm";

const defaultComponentSetup = () => {
  return renderWithProvider(<SchedulingForm />, {
    preloadedState: {
      suppliers: { value: suppliers },
      contentfulSuppliers: { value: contentfulSuppliers },
      appStatus: { value: AppStatus.PROCESSED_SUPPLIERS },
    },
  });
};

describe("ScheduleSidebar Component", () => {
  afterEach(() => cleanup());

  it("selects today and 12:01 PM as the default time", () => {
    const { getByText } = defaultComponentSetup();

    const todayString = `${dateFormat(new Date(), "ddd, dd mmm yyyy")} at 12:01 AM`;
    expect(getByText(todayString)).toBeTruthy();
  });

  it("shows the correct date when a day is selected from the calendar", async () => {
    const { getByRole, getByText } = defaultComponentSetup();

    const dateInput = getByRole("textbox", { name: "Enter date" });
    const user = await userEvent.setup();

    await user.click(dateInput);
    await user.keyboard("01 Sep 2024");

    expect(getByText(/01 Sep 2024 at 12:01 AM/)).toBeTruthy();
  });

  it("shows an error message and disables the button when an invalid date is entered", async () => {
    const { getByRole, getByText } = defaultComponentSetup();

    const dateInput = getByRole("textbox", { name: "Enter date" });
    const user = await userEvent.setup();

    await user.click(dateInput);
    await user.keyboard("I am not a date");

    await user.tab(dateInput);

    expect(getByText("Enter a valid date and time (HH:MM)")).toBeTruthy();
    expect(
      getByRole("button", { name: "Schedule Update", disabled: true }),
    ).toBeTruthy();
  });

  it("shows the correct time when a valid time is entered", async () => {
    const { getByRole, getByText } = defaultComponentSetup();

    const timeInput = getByRole("textbox", { name: "Enter time" });
    const user = await userEvent.setup();

    await user.click(timeInput);
    await user.keyboard("13:01");
    await user.tab(timeInput);

    expect(getByText(/at 1:01 PM/)).toBeTruthy();
  });

  it("shows an error message and disables the button when an invalid time is entered", async () => {
    const { getByRole, getByText } = defaultComponentSetup();

    const timeInput = getByRole("textbox", { name: "Enter time" });
    const user = await userEvent.setup();

    await user.click(timeInput);
    await user.keyboard("I am not a time");
    await user.tab(timeInput);

    expect(getByText("Enter a valid date and time (HH:MM)")).toBeTruthy();
    expect(
      getByRole("button", { name: "Schedule Update", disabled: true }),
    ).toBeTruthy();
  });

  it("disables the button when the scheduling is underway", () => {
    const { getByRole } = renderWithProvider(<SchedulingForm />, {
      preloadedState: {
        suppliers: { value: suppliers },
        contentfulSuppliers: { value: contentfulSuppliers },
        appStatus: { value: AppStatus.SCHEDULING_UPDATES },
      },
    });

    expect(
      getByRole("button", { name: "Schedule Update", disabled: true }),
    ).toBeTruthy();
  });
});
