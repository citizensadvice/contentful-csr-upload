import {
  CONTENTFUL_PUT_ERROR,
  PARSED,
  TO_BE_PUBLISHED,
} from "../../src/constants/supplier-status";

const suppliers = [
  {
    name: "Supplier in Contentful that has been successfully updated",
    rank: "1",
    overallRating: "4.9",
    complaintsRatings: "3.9",
    contactRating: "2.9",
    guaranteeRating: "1.9",
    id: "1",
    status: TO_BE_PUBLISHED,
  },
  {
    name: "Supplier in Contentful that errored during update",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "2",
    isSmall: true,
    status: CONTENTFUL_PUT_ERROR,
  },
  {
    name: "Supplier in Contentful that has not been updated yet",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "3",
    isSmall: true,
    status: PARSED,
  },
  {
    name: "Supplier not in Contentful that has been successfully updated",
    rank: "1",
    overallRating: "4.9",
    complaintsRatings: "3.9",
    contactRating: "2.9",
    guaranteeRating: "1.9",
    newContentfulId: "zyx123",
    id: "10",
    status: TO_BE_PUBLISHED,
  },
  {
    name: "Supplier not in Contentful that errored during update",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "11",
    isSmall: true,
    status: CONTENTFUL_PUT_ERROR,
  },
  {
    name: "Supplier not in Contentful that has not been updated yet",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "12",
    isSmall: true,
    status: PARSED,
  },
];

const contentfulSuppliers = [
  {
    name: "Supplier in Contentful that has been successfully updated",
    id: "1",
    contentfulId: "1234",
    dataAvailable: true,
  },
  {
    name: "Supplier in Contentful that errored during update",
    id: "2",
    contentfulId: "5678",
    dataAvailable: false,
  },
  {
    name: "Supplier in Contentful that has not been updated yet",
    id: "3",
    contentfulId: "9101",
    dataAvailable: true,
  },
  {
    name: "Supplier in Contentful but not in the spreadsheet",
    id: "999",
    contentfulId: "abc123",
    dataAvailable: true,
  },
];

export { contentfulSuppliers, suppliers };
