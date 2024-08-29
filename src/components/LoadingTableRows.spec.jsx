import { describe, expect, it, afterEach } from "vitest";

import LoadingTableRows from "./LoadingTableRows";
import {
  FETCHED_CONTENTFUL_SUPPLIERS,
  FETCHING_CONTENTFUL_SUPPLIERS,
} from "../constants/app-status";
import { Paragraph, Table } from "@contentful/f36-components";
import { renderWithProvider } from "../../test/utils/render-with-provider";
import { cleanup, getByText, queryByRole } from "@testing-library/react";

describe("LoadingTableComponent", () => {
  const loadingTable = (
    <Table>
      <Table.Body>
        <LoadingTableRows
          showOnStatus={FETCHED_CONTENTFUL_SUPPLIERS}
          rowCount={1}
          colCount={1}
        >
          <Table.Row>
            <Table.Cell>
              <Paragraph>I am the content</Paragraph>
            </Table.Cell>
          </Table.Row>
        </LoadingTableRows>
      </Table.Body>
    </Table>
  );

  afterEach(() => cleanup());

  it("displays a loading animation when not in 'show on status' status", () => {
    const { queryByRole, queryByText } = renderWithProvider(loadingTable, {
      preloadedState: { appStatus: { value: FETCHING_CONTENTFUL_SUPPLIERS } },
    });
    expect(queryByText("I am the content")).toBeFalsy();
    expect(queryByRole("img", { name: "Loading component..." })).toBeTruthy();
  });

  it("displays the children when not loading", () => {
    const { queryByRole, getByText } = renderWithProvider(loadingTable, {
      preloadedState: { appStatus: { value: FETCHED_CONTENTFUL_SUPPLIERS } },
    });
    expect(getByText("I am the content")).toBeTruthy();
    expect(queryByRole("img", { name: "Loading component..." })).toBeFalsy();
  });
});
