import { describe, expect, it } from "vitest";

import SuppliersNotInFile from "./SuppliersNotInFile";
import { within } from "@testing-library/react";
import { renderWithProvider } from "../../test/utils/render-with-provider";
import {
  suppliers,
  contentfulSuppliers,
} from "../../test/fixtures/process-screen-state";
import { FETCHED_CONTENTFUL_SUPPLIERS } from "../constants/app-status";

describe("SuppliersNotInFile component", () => {
  const { getByRole, queryByText } = renderWithProvider(
    <SuppliersNotInFile />,
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
    expect(rows.length).toEqual(1);
  });

  it("displays the correct data for a supplier", () => {
    const columns = within(rows[0]).getAllByRole("cell");
    expect(columns[0].textContent).toContain(
      "I am a Contentful supplier that isn't in the file",
    );
    expect(columns[1].textContent).toContain("ranked");
  });

  it("does not display suppliers in the file but not in Contentful", () => {
    expect(
      queryByText("I am a supplier that is in the file but not Contentful"),
    ).toBeFalsy();
  });

  it("does not display suppliers in the file and Contentful", () => {
    expect(queryByText("I am a ranked supplier")).toBeFalsy();
  });

  it("does not render anything when there are no suppliers", () => {
    const { screen } = renderWithProvider(<SuppliersNotInFile />);
    expect(screen).toEqual(undefined);
  });
});
