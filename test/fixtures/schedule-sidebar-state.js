import { TO_BE_PUBLISHED } from "../../src/constants/supplier-status";

const suppliers = [
  {
    name: "Supplier in Contentful 1",
    rank: "1",
    overallRating: "4.9",
    complaintsRatings: "3.9",
    contactRating: "2.9",
    guaranteeRating: "1.9",
    id: 1,
    status: TO_BE_PUBLISHED,
  },
  {
    name: "Supplier in Contentful 2",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: 2,
    isSmall: true,
    status: TO_BE_PUBLISHED,
  },
  {
    name: "Supplier not in Contentful",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: 4,
    isSmall: true,
    status: TO_BE_PUBLISHED,
  },
];

const contentfulSuppliers = [
  {
    name: "Contentful supplier 1",
    id: 1,
    contentfulId: "1234",
    dataAvailable: true,
  },
  {
    name: "Contentful supplier 2",
    id: 2,
    contentfulId: "5678",
    dataAvailable: false,
  },
  {
    name: "Supplier in Contentful but not in the spreadsheet",
    id: 999,
    contentfulId: "abc123",
    dataAvailable: true,
  },
];

export { contentfulSuppliers, suppliers };
