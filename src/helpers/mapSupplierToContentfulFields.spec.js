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

  it("populates the billAccuracyAndMeteringRating field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.billAccuracyAndMeteringRating = 2;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.billAccuracyAndMeteringRating = { "en-GB": 2 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the billAccuracyAndMeteringRating field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("billAccuracyAndMeteringRating");
  });

  it("populates the contactWebchatSync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactWebchatSync = "00:31:08";

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactWebchatSync = { "en-GB": "00:31:08" };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the contactWebchatSync field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("contactWebchatSync");
  });

  it("populates the contactWebchatAsync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactWebchatAsync = 98.6;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactWebchatAsync = { "en-GB": 98.6 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the contactWebchatAsync field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("contactWebchatAsync");
  });

  it("populates the contactInAppSync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactInAppSync = "00:03:18";

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactInAppSync = { "en-GB": "00:03:18" };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactInAppAsync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactInAppAsync = 28.9;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactInAppAsync = { "en-GB": 28.9 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactWhatsappSync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactWhatsappSync = "00:09:09";

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactWhatsappSync = { "en-GB": "00:09:09" };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactWhatsappAsync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactWhatsappAsync = 82.9;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactWhatsappAsync = { "en-GB": 82.9 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactSmsSync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactSmsSync = "00:19:39";

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactSmsSync = { "en-GB": "00:19:39" };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactSmsAsync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactSmsAsync = 92.9;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactSmsAsync = { "en-GB": 92.9 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactPortalSync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactPortalSync = "01:14:02";

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactPortalSync = { "en-GB": "01:14:02" };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the contactSmsAsync field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.contactSmsAsync = 58.1;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.contactSmsAsync = { "en-GB": 58.1 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("populates the billsAccuracySmart field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.billsAccuracySmart = 78.9;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.billsAccuracySmart = { "en-GB": 78.9 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the billsAccuracySmart field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("billsAccuracySmart");
  });

  it("populates the billsAccuracyTraditional field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.billsAccuracyTraditional = 86.3;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.billsAccuracyTraditional = { "en-GB": 86.3 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the billsAccuracyTraditional field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("billsAccuracyTraditional");
  });

  it("populates the smartOperating field if present", () => {
    let supplier = structuredClone(testSupplier);
    supplier.smartOperating = 99.9;

    let expectedSupplierFields = structuredClone(expectedFields);
    expectedSupplierFields.smartOperating = { "en-GB": 99.9 };

    expect(mapSupplierToContentfulFields(supplier).fields).toEqual(
      expectedSupplierFields,
    );
  });

  it("does not populate the smartOperating field if not present", () => {
    const supplier = mapSupplierToContentfulFields(testSupplier).fields;
    const keys = Object.keys(supplier);

    expect(keys).not.toContain("smartOperating");
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
