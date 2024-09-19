import { describe, expect, it, vi } from "vitest";

import { cleanup, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { renderWithProvider } from "../../test/utils/render-with-provider";
import {
  suppliers,
  contentfulSuppliers,
} from "../../test/fixtures/schedule-screen-state";
import { Table } from "@contentful/f36-components";
import SuppliersToBeUpdated from "./SuppliersToBeUpdated";

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

const componentInTable = (
  <Table>
    <Table.Body>
      <SuppliersToBeUpdated />
    </Table.Body>
  </Table>
);

describe("SuppliersToBeUpdated component", () => {
  const { getByText, getAllByRole, queryByText } = renderWithProvider(
    componentInTable,
    {
      preloadedState: {
        suppliers: { value: suppliers },
        contentfulSuppliers: { value: contentfulSuppliers },
      },
    },
  );

  const rows = getAllByRole("row");
  const successfulUpdateCells = within(rows[0]).getAllByRole("cell");
  const failedUpdateCells = within(rows[1]).getAllByRole("cell");
  const noUpdateCells = within(rows[2]).getAllByRole("cell");

  it("displays a row for each supplier", () => {
    expect(rows.length).toEqual(3);
  });

  it("displays suppliers that should be updated", () => {
    expect(
      getByText("Supplier in Contentful that has been successfully updated"),
    ).toBeTruthy();
    expect(
      getByText("Supplier in Contentful that errored during update"),
    ).toBeTruthy();
    expect(
      getByText("Supplier in Contentful that has not been updated yet"),
    ).toBeTruthy();
  });

  it("does not display suppliers that should not be updated", () => {
    expect(
      queryByText(
        "Supplier not in Contentful that has been successfully updated",
      ),
    ).toBeFalsy();
  });

  it("displays a success message when the update is successful", () => {
    expect(successfulUpdateCells[1].textContent).toContain("OK");
  });

  it("displays the correct statuses when the update is successful", () => {
    expect(successfulUpdateCells[2].textContent).toContain("changed");
    expect(successfulUpdateCells[3].textContent).toContain("published");
  });

  it("doesn't display a result for the scheduling action yet", () => {
    expect(successfulUpdateCells[4].textContent).toEqual("—");
  });

  it("displays the view entry link when the update is successful", async () => {
    const viewEntryLink = within(successfulUpdateCells[5]).getByText(
      "View entry",
    );
    expect(viewEntryLink).toBeTruthy();

    const user = userEvent.setup();
    await user.click(viewEntryLink);

    expect(openEntryMock).toHaveBeenCalledOnce();
  });

  it("displays a failure message when the update fails", () => {
    expect(failedUpdateCells[1].textContent).toContain("Errors during update");
  });

  it("displays a loading animation when the update has not happened yet", () => {
    expect(
      within(noUpdateCells[2]).getByRole("img", { name: "Loading..." }),
    ).toBeTruthy();
  });

  it("does not render anything when there are no suppliers to be created", () => {
    cleanup();
    const { screen } = renderWithProvider(<SuppliersToBeUpdated />);
    expect(screen).toEqual(undefined);
  });
});
