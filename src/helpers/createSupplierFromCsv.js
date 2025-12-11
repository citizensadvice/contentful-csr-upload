import { PARSED } from "../constants/supplier-status";

const createSupplierFromCsv = (row) => {
  const supplier = {
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
    contactInfo: row["contactInformation"],
    billingInfo: row["billingInformation"],
    openingHours: row["openingHours"],
    fuelMix: row["fuelMix"],
    status: PARSED,
  };

  if (import.meta.env.VITE_REACT_APP_FF_NEW_CSR_DATA === "true") {
    supplier.complaintsRatings = parseInt(row["complaintsRating"]);
    supplier.complaintsRatingScore = parseFloat(row["complaintsRating"]);
    supplier.billAccuracyAndMeteringRating = parseFloat(
      row["billAccuracyandMeteringRating"],
    );
    supplier.contactWebchatSync = row["contactWebchatSync"];
    supplier.contactWebchatAsync = parseFloat(row["contactWebchatAsync%"]);
    supplier.contactInAppSync = row["contactInAppSync"];
    supplier.contactInAppAsync = parseFloat(row["contactInAppAsync%"]);
    supplier.contactWhatsappSync = row["contactWhatsappSync"];
    supplier.contactWhatsappAsync = parseFloat(row["contactWhatsappAsync%"]);
    supplier.contactSmsSync = row["contactSMSSync"];
    supplier.contactSmsAsync = parseFloat(row["contactSMSAsync%"]);
    supplier.contactPortalSync = row["contactPortalSync"];
    supplier.contactPortalAsync = parseFloat(row["contactPortalAsync%"]);
  } else {
    supplier.complaintsRatings = parseInt(row["complaintsRating"]);
  }

  return supplier;
};

const isSmall = (dataAvailable) => {
  return dataAvailable === "FALSE";
};

export default createSupplierFromCsv;
