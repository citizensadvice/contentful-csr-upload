const suppliers = [
  {
    name: "I am a ranked supplier",
    rank: "1",
    overallRating: "4.9",
    complaintsRatings: "3.9",
    contactRating: "2.9",
    guaranteeRating: "1.9",
    id: "1",
  },
  {
    name: "I am another supplier",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "2",
    isSmall: true,
  },
  {
    name: "I am a supplier that is in the file but not Contentful",
    rank: "2",
    overallRating: "3.9",
    complaintsRatings: "2.9",
    contactRating: "1.9",
    guaranteeRating: "0.9",
    id: "9",
    isSmall: true,
  },
];

const contentfulSuppliers = [
  {
    name: "I am a ranked supplier in Contentful",
    id: "1",
    contentfulId: "1234",
    dataAvailable: true,
    status: "published",
  },
  {
    name: "I am another supplier in Contentful",
    id: "2",
    contentfulId: "5678",
    dataAvailable: false,
    status: "draft",
  },
  {
    name: "I am a Contentful supplier that isn't in the file",
    id: "99",
    contentfulId: "9101",
    dataAvailable: true,
    status: "published",
  },
];

export { contentfulSuppliers, suppliers };
