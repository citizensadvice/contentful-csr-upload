import { PARSED } from "../constants/supplier-status";

const createSupplierFromCsv = (row) => {
  return {
    id: parseInt(row["SupplierId"]),
    name: row["supplierName"],
    whiteLabelId: row["whiteLabelId"],
    whitelabelSupplierContentfulId: undefined,
    isSmall: isSmall(row["dataAvailable"]),
    rank: parseInt(row["supplierRank"]),
    overallRating: parseFloat(row["overallRating"]),
    complaintsRatings: parseInt(row["complaintsRating"]),
    complaintsNumber: parseFloat(row["complaintsNumber"]),
    contactRating: parseFloat(row["contactRating"]),
    contactTime: row["contactTime"],
    contactEmail: parseFloat(row["contactEmail%"]),
    contactSocialMedia: row["contactSocialMedia"],
    guaranteeRating: parseFloat(row["guaranteeRating"]),
    guaranteesList: row["guaranteesList"],
    complaintsRatingScore: parseFloat(row["complaintsRating"]),
    billAccuracyAndMeteringRating: parseFloat(
      row["billAccuracyandMeteringRating"],
    ),
    contactWebchatSync: row["contactWebchatSync"],
    contactWebchatAsync: parseFloat(row["contactWebchatAsync%"]),
    contactInAppSync: row["contactInAppSync"],
    contactInAppAsync: parseFloat(row["contactInAppAsync%"]),
    contactWhatsappSync: row["contactWhatsappSync"],
    contactWhatsappAsync: parseFloat(row["contactWhatsappAsync%"]),
    contactSmsSync: row["contactSMSSync"],
    contactSmsAsync: parseFloat(row["contactSMSAsync%"]),
    contactPortalSync: row["contactPortalSync"],
    contactPortalAsync: parseFloat(row["contactPortalAsync%"]),
    billsAccuracySmart: parseFloat(row["billsAccuracySmart%"]),
    billsAccuracyTraditional: parseFloat(row["billsAccuracyTraditional%"]),
    smartOperating: parseFloat(row["smartOperating%"]),
    contactInfo: row["contactInformation"],
    billingInfo: row["billingInformation"],
    openingHours: row["openingHours"],
    fuelMix: row["fuelMix"],
    status: PARSED,
  };
};

const isSmall = (dataAvailable) => {
  return dataAvailable === "FALSE";
};

export default createSupplierFromCsv;
