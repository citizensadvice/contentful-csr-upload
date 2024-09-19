import { describe, expect, it, afterEach } from "vitest";

import { cleanup } from "@testing-library/react";
import ScheduleResult from "./ScheduleResult";
import { SCHEDULED_ACTION_PUT_ERROR } from "../constants/error-types";
import { Table } from "@contentful/f36-components";
import {
  ACTION_SCHEDULED,
  TO_BE_PUBLISHED,
} from "../constants/supplier-status";
import { renderWithProvider } from "../../test/utils/render-with-provider";
import { userEvent } from "@testing-library/user-event";

const error = {
  status: 422,
  statusText: "",
  message: "Invalid request payload input",
  details: {
    errors: [
      {
        name: "datetime",
        path: ["scheduledFor"],
        details: '"scheduledFor.datetime" must be in the future',
        value: "2024-08-31T23:01:00.000Z",
      },
    ],
  },
  request: {
    url: "https://api.contentful.com:443/spaces/j9d3gn48j4iu/scheduled_actions",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-User-Agent":
        "app contentful.web-app; platform browser; sha 3114531e143db36b8f368acbf807c81037ecc659",
    },
    method: "POST",
  },
};

const contentfulErrors = [
  {
    id: "1234",
    errorType: SCHEDULED_ACTION_PUT_ERROR,
    error: JSON.stringify(error),
  },
];

const componentInTable = (status) => {
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <ScheduleResult id="1234" status={status} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

describe("ScheduleResultComponent", () => {
  afterEach(() => cleanup());
  it("shows OK when the scheduling was successful", () => {
    const { getByText } = renderWithProvider(
      componentInTable(ACTION_SCHEDULED),
      {
        preloadedState: {
          contentfulErrors: { value: contentfulErrors },
        },
      },
    );

    expect(getByText("OK")).toBeTruthy();
  });

  it("shows an error message when scheduling failed", async () => {
    const { getByText } = renderWithProvider(
      componentInTable(TO_BE_PUBLISHED),
      {
        preloadedState: {
          contentfulErrors: { value: contentfulErrors },
        },
      },
    );

    const modalLink = getByText("Error");
    expect(modalLink).toBeTruthy();

    const user = await userEvent.setup();
    await user.click(modalLink);

    expect(
      getByText('"scheduledFor.datetime" must be in the future'),
    ).toBeTruthy();
  });
});
