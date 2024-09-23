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
