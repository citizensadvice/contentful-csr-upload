import {
  CONTENTFUL_PUT_ERROR,
  PARSED,
  TO_BE_PUBLISHED,
} from "../../src/constants/supplier-status";
import { SUPPLIER_PUT_ERROR } from "../../src/constants/error-types";

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

const error = {
  status: 422,
  statusText: "",
  message: "Invalid request payload input",
  details: {
    errors: [
      {
        details: "en-FR is not allowed here",
        value: "2024-08-31T23:01:00.000Z",
      },
    ],
  },
  request: {
    url: "https://api.contentful.com:443/spaces/j9d3gn48j4iu/entry",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/vnd.contentful.management.v1+json",
      "X-Contentful-User-Agent":
        "app contentful.web-app; platform browser; sha 3114531e143db36b8f368acbf807c81037ecc659",
    },
    method: "POST",
  },
};

const contentfulErrors = [
  {
    id: "2",
    errorType: SUPPLIER_PUT_ERROR,
    error: JSON.stringify(error),
  },
  {
    id: "11",
    errorType: SUPPLIER_PUT_ERROR,
    error: JSON.stringify(error),
  },
];

export { contentfulSuppliers, suppliers, contentfulErrors };
