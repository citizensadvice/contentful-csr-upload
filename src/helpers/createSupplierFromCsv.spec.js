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
  billAccuracyandMeteringRating: "3",
  contactWebchatSync: "00:01:22",
  "contactWebchatAsync%": "67.4",
  contactInAppSync: "00:04:32",
  "contactInAppAsync%": "93.1",
  contactWhatsappSync: "00:01:41",
  "contactWhatsappAsync%": "84.7",
  contactSMSSync: "00:00:22",
  "contactSMSAsync%": "66.8",
  contactPortalSync: "00:05:45",
  "contactPortalAsync%": "99.9",
  "billsAccuracySmart%": "92.3",
  "billsAccuracyTraditional%": "87.5",
  "smartOperating%": "76.1",
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
      complaintsRatingScore: 2,
      complaintsNumber: 1.1,
      billAccuracyAndMeteringRating: 3,
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
      contactWebchatSync: "00:01:22",
      contactWebchatAsync: 67.4,
      contactInAppSync: "00:04:32",
      contactInAppAsync: 93.1,
      contactWhatsappSync: "00:01:41",
      contactWhatsappAsync: 84.7,
      contactSmsSync: "00:00:22",
      contactSmsAsync: 66.8,
      contactPortalSync: "00:05:45",
      contactPortalAsync: 99.9,
      billsAccuracySmart: 92.3,
      billsAccuracyTraditional: 87.5,
      smartOperating: 76.1,
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
    expect(smallSupplier.billAccuracyAndMeteringRating).toEqual(NaN);
    expect(smallSupplier.contactWebchatAsync).toEqual(NaN);
    expect(smallSupplier.contactInAppAsync).toEqual(NaN);
    expect(smallSupplier.contactWhatsappAsync).toEqual(NaN);
    expect(smallSupplier.contactSmsAsync).toEqual(NaN);
    expect(smallSupplier.contactPortalAsync).toEqual(NaN);
    expect(smallSupplier.billsAccuracySmart).toEqual(NaN);
    expect(smallSupplier.billsAccuracyTraditional).toEqual(NaN);
    expect(smallSupplier.smartOperating).toEqual(NaN);
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
    expect(smallSupplier.contactInAppSync).toEqual(undefined);
    expect(smallSupplier.contactWhatsappSync).toEqual(undefined);
    expect(smallSupplier.contactSmsSync).toEqual(undefined);
    expect(smallSupplier.contactPortalSync).toEqual(undefined);
  });

  it("parses small supplier dataAvailable correctly", () => {
    const smallSupplier = createSupplierFromCsv(smallSupplierRow);
    expect(smallSupplier.isSmall).toEqual(true);
  });
});
