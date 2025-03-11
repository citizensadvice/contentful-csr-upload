import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

import SuppliersInFileAndContentful from "./SuppliersInFileAndContentful";
import { within } from "@testing-library/react";
import { renderWithProvider } from "../../test/utils/render-with-provider";
import {
  suppliers,
  contentfulSuppliers,
} from "../../test/fixtures/process-screen-state";
import { FETCHED_CONTENTFUL_SUPPLIERS } from "../constants/app-status";

const openEntryMock = vi.fn();

vi.mock("@contentful/react-apps-toolkit", () => {
  return {
    useSDK: () => {
      return {
        navigator: {
          openEntry: openEntryMock,
        },
      };
    },
  };
});
describe("SuppliersFoundInContentful component", () => {
  const { getByRole, queryByText } = renderWithProvider(
    <SuppliersInFileAndContentful />,
    {
      preloadedState: {
        suppliers: { value: suppliers },
        contentfulSuppliers: { value: contentfulSuppliers },
        appStatus: { value: FETCHED_CONTENTFUL_SUPPLIERS },
      },
    },
  );
  const table = getByRole("table");
  const tbody = within(table).getAllByRole("rowgroup")[1]; // this is the table body
  const rows = within(tbody).getAllByRole("row");

  it("displays a row for each supplier", () => {
    expect(rows.length).toEqual(2);
  });

  it("displays the correct data for a ranked supplier", () => {
    const columns = within(rows[0]).getAllByRole("cell");
    expect(columns[0].textContent).toContain("I am a ranked supplier");
    expect(columns[1].textContent).toContain(
      "I am a ranked supplier in Contentful",
    );
    expect(columns[2].textContent).toContain("published");
    expect(columns[3].textContent).toContain("ranked");
  });

  it("displays the correct data for a small supplier", () => {
    const columns = within(rows[1]).getAllByRole("cell");
    expect(columns[0].textContent).toContain("I am another supplier");
    expect(columns[1].textContent).toContain(
      "I am another supplier in Contentful",
    );
    expect(columns[2].textContent).toContain("draft");
    expect(columns[3].textContent).toContain("small");
  });

  it("displays a link to the supplier in Contentful", async () => {
    const viewEntryLink = within(rows[1]).getByText(
      "I am another supplier in Contentful",
    );
    expect(viewEntryLink).toBeTruthy();

    const user = userEvent.setup();
    await user.click(viewEntryLink);

    expect(openEntryMock).toHaveBeenCalledOnce();
  });

  it("does not display suppliers in Contentful but not the file", () => {
    expect(
      queryByText("I am a Contentful supplier that isn't in the file"),
    ).toBeFalsy();
  });

  it("does not display suppliers in the file but not in Contentful", () => {
    expect(
      queryByText("I am a supplier that is in the file but not Contentful"),
    ).toBeFalsy();
  });

  it("does not render anything when there are no suppliers", () => {
    const { screen } = renderWithProvider(<SuppliersInFileAndContentful />);
    expect(screen).toEqual(undefined);
  });
});
