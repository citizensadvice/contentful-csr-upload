import { describe, expect, it } from "vitest";

import RankedSuppliers from "./RankedSuppliers";
import { render, within } from "@testing-library/react";

describe("RankedSuppliers component", () => {
  const suppliers = [
    {
      name: "I am a ranked supplier",
      rank: "1",
      overallRating: "4.9",
      complaintsRatings: "3.9",
      contactRating: "2.9",
      guaranteeRating: "1.9",
      expectationRating: "4",
      id: 1,
    },
    {
      name: "I am another ranked supplier",
      rank: "2",
      overallRating: "3.9",
      complaintsRatings: "2.9",
      contactRating: "1.9",
      guaranteeRating: "0.9",
      expectationRating: "2",
      id: 2,
    },
  ];

  const { getByRole } = render(<RankedSuppliers suppliers={suppliers} />);
  const table = getByRole("table");
  const tbody = within(table).getAllByRole("rowgroup")[1]; // this is the table body
  const rows = within(tbody).getAllByRole("row");

  it("displays a row for each supplier", () => {
    expect(rows.length).toEqual(2);
  });

  it("displays the correct data for a supplier", () => {
    const columns = within(rows[0]).getAllByRole("cell");
    expect(columns[0].textContent).toContain("I am a ranked supplier");
    expect(columns[1].textContent).toContain("1");
    expect(columns[2].textContent).toContain("4.9");
    expect(columns[3].textContent).toContain("3.9");
    expect(columns[4].textContent).toContain("2.9");
    expect(columns[5].textContent).toContain("1.9");
    expect(columns[6].textContent).toContain("4");
  });

  it("does not render anything when there are no suppliers", () => {
    const { screen } = render(<RankedSuppliers suppliers={[]} />);
    expect(screen).toEqual(undefined);
  });
});
