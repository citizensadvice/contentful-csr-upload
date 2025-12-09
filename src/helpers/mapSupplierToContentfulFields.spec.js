import { describe, it, expect } from "vitest";

import mapSupplierToContentfulFields from "./mapSupplierToContentfulFields";
import { PARSED } from "../constants/supplier-status";
import { expectedFields } from "../../test/fixtures/contentful-supplier";

const testSupplier = {
  id: 1,
  name: "test supplier",
  whiteLabelId: 2,
  isSmall: false,
  rank: 99,
  overallRating: Number("3.5"),
  complaintsRatings: 3,
  complaintsNumber: Number("3"),
  contactRating: Number("3"),
  contactTime: "00:11:30",
  contactEmail: Number(99.3),
  contactSocialMedia: "99,000",
  guaranteeRating: Number("4.32"),
  guaranteesList: "- guarantee 1\n- guarantee 2\n- guarantee 3",
  contactInfo:
    "[01234 5678910](tel:012345678910)\n[www.example.com](https://www.example.com)",
  billingInfo: "[billing@example.com](mailto:billing@example.com)",
  openingHours:
    "Monday: 9am - 5pm,\nTuesday: 9am - 5pm,\nWednesday: 9am - 5pm,\nThursday: 9am - 5pm,\nFriday: 9am - 5pm,\nSaturday: Closed,\nSunday: Closed",
  fuelMix: "Fossil fuel: 55%,\n\rNuclear: 11%,\n\rRenewable: 29%,\n\rOther: 4%",
  status: PARSED,
};

describe("mapSupplierToContentfulFields", () => {
  it("updates the fields of an existing Contentful entry", () => {
    let contentfulEntry = {
      fields: {
        name: "old supplier name",
      },
    };

    mapSupplierToContentfulFields(testSupplier, contentfulEntry);
    expect(contentfulEntry.fields).toEqual(expectedFields);
  });

  it("creates the correct fields if no entry is passed", () => {
    expect(mapSupplierToContentfulFields(testSupplier).fields).toEqual(
      expectedFields,
    );
  });

  it("populates the complaintsRatingScore field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.complaintsRatingScore = 3.4;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.complaintsRatingScore = { "en-GB": 3.4 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not create text nodes at the top level of the content JSON", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier);
    const content = supplier.fields.billingInfo["en-GB"].content;
    const topLevelTextNodes = content.filter(
      (node) => node.nodeType === "text",
    );
    expect(topLevelTextNodes.length).toEqual(0);
  });

  it("handles empty supplier fields", () => {
    let supplier = structuredClone(testSupplier);
    supplier.billingInfo = undefined;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.billingInfo["en-GB"] = undefined;

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("adds whitelabel supplier entry link when whitelabelSupplierContentfulId is present on the supplier", () => {
    const testWhitelabelledSupplier = {
      ...testSupplier,
      ...{ whitelabelSupplierContentfulId: "12345" },
    };
    const whitelabelField = {
      "en-GB": { sys: { type: "Link", linkType: "Entry", id: "12345" } },
    };
    const expectedWhitelabelledSupplierFields = {
      ...expectedFields,
      ...{ whitelabelSupplier: whitelabelField },
    };

    expect(
      mapSupplierToContentfulFields(testWhitelabelledSupplier).fields,
    ).toEqual(expectedWhitelabelledSupplierFields);
  });
});
