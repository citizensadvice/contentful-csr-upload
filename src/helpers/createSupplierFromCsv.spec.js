import { describe, it, expect } from "vitest";

import createSupplierFromCsv from "./createSupplierFromCsv";
import { PARSED } from "../constants/supplier-status";

const row = {
  SupplierId: "1",
  supplierName: "Energy supplier 1",
  whiteLabelId: "100",
  dataAvailable: "TRUE",
  supplierRank: "1",
  overallRating: "1.1",
  complaintsRating: "2",
  complaintsNumber: "1.1",
  contactRating: "1.1",
  contactTime: "00:11:22",
  "contactEmail%": "100",
  contactSocialMedia: "10,000",
  guaranteeRating: "1.1",
  guaranteesList: " - item 1\n - item 2",
  contactInformation: "[email@email.com](mailto:email@email.com)",
  billingInformation: "Debit card: Yes",
  openingHours: "M-F 0900 - 1900",
  fuelMix: "Renewable: 100%",
};

const smallSupplierRow = {
  SupplierId: "1",
  supplierName: "Energy supplier 2",
  whiteLabelId: "100",
  dataAvailable: "FALSE",
};

describe("createSupplierFromCsv", () => {
  it("parses a well formed row into a correct supplier object", () => {
    const expectedSupplier = {
      id: 1,
      name: "Energy supplier 1",
      whiteLabelId: "100",
      whitelabelSupplierContentfulId: undefined,
      isSmall: false,
      rank: 1,
      overallRating: 1.1,
      complaintsRatings: 2,
      complaintsNumber: 1.1,
      contactRating: 1.1,
      contactTime: "00:11:22",
      contactEmail: 100,
      contactSocialMedia: "10,000",
      guaranteeRating: 1.1,
      guaranteesList: " - item 1\n - item 2",
      contactInfo: "[email@email.com](mailto:email@email.com)",
      billingInfo: "Debit card: Yes",
      openingHours: "M-F 0900 - 1900",
      fuelMix: "Renewable: 100%",
      status: PARSED,
    };

    expect(createSupplierFromCsv(row)).toEqual(expectedSupplier);
  });

  it("parses missing numerical data into NaN", () => {
    const smallSupplier = createSupplierFromCsv(smallSupplierRow);

    expect(smallSupplier.rank).toEqual(NaN);
    expect(smallSupplier.overallRating).toEqual(NaN);
    expect(smallSupplier.complaintsRatings).toEqual(NaN);
    expect(smallSupplier.complaintsNumber).toEqual(NaN);
    expect(smallSupplier.contactRating).toEqual(NaN);
    expect(smallSupplier.contactEmail).toEqual(NaN);
    expect(smallSupplier.guaranteeRating).toEqual(NaN);
  });

  it("parses missing text data into undefined", () => {
    const smallSupplier = createSupplierFromCsv(smallSupplierRow);

    expect(smallSupplier.contactTime).toEqual(undefined);
    expect(smallSupplier.contactSocialMedia).toEqual(undefined);
    expect(smallSupplier.contactInfo).toEqual(undefined);
    expect(smallSupplier.guaranteesList).toEqual(undefined);
    expect(smallSupplier.billingInfo).toEqual(undefined);
    expect(smallSupplier.fuelMix).toEqual(undefined);
    expect(smallSupplier.openingHours).toEqual(undefined);
  });

  it("parses small supplier dataAvailable correctly", () => {
    const smallSupplier = createSupplierFromCsv(smallSupplierRow);
    expect(smallSupplier.isSmall).toEqual(true);
  });
});
