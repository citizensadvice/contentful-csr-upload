import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import { mockCma, mockSdk } from "../../test/mocks";
import Page from "./Page";
import { renderWithProvider } from "../../test/utils/render-with-provider";

vi.mock("@contentful/react-apps-toolkit", () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

afterEach(() => {
  cleanup();
});
describe("Page component", () => {
  it("displays the upload file screen and sidebar on app load", () => {
    const { getByRole } = renderWithProvider(<Page />);

    // Screen
    expect(
      getByRole("heading", {
        name: "Upload the data file",
      }),
    ).toBeTruthy();

    // Sidebar
    expect(
      getByRole("heading", {
        name: "UPLOAD SUPPLIERS",
      }),
    ).toBeTruthy();
  });

  it("displays the match screen and sidebar when state is match", () => {
    const { getByRole } = renderWithProvider(<Page />, {
      preloadedState: {
        screen: { value: "match" },
      },
    });

    // Screen
    expect(
      screen.getByText("These are the suppliers found in the uploaded file."),
    ).toBeTruthy();

    // Sidebar
    expect(
      getByRole("heading", {
        name: "MATCH SUPPLIERS",
      }),
    ).toBeTruthy();
  });

  it("displays the process file screen and sidebar when state is process", () => {
    const { getByRole } = renderWithProvider(<Page />, {
      preloadedState: {
        screen: { value: "process" },
      },
    });

    // Screen
    expect(
      getByRole("heading", {
        name: "Suppliers to be updated",
      }),
    ).toBeTruthy();

    expect(
      getByRole("heading", {
        name: "Suppliers to be created",
      }),
    ).toBeTruthy();

    expect(
      getByRole("heading", {
        name: "Suppliers to be unpublished",
      }),
    ).toBeTruthy();

    // Sidebar
    expect(
      getByRole("heading", {
        name: "PROCESS SUPPLIERS",
      }),
    ).toBeTruthy();
  });

  it("displays the schedule screen and sidebar when state is schedule", () => {
    const { getByRole } = renderWithProvider(<Page />, {
      preloadedState: {
        screen: { value: "schedule" },
      },
    });

    // Screen
    expect(
      getByRole("heading", {
        name: "Suppliers to be published",
      }),
    ).toBeTruthy();

    // Sidebar
    expect(
      getByRole("heading", {
        name: "SCHEDULE PUBLISH / UNPUBLISH",
      }),
    ).toBeTruthy();
  });
});
