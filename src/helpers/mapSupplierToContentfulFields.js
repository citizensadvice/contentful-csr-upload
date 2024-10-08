import markdownToJson from "./markdownToJson";
import { slugify } from "@contentful/field-editor-slug";

const emptyContentfulSupplier = {
  fields: {
    name: null,
    rank: null,
    complaintsNumber: null,
    complaintsRating: null,
    dataAvailable: null,
    overallRating: null,
    contactEmail: null,
    contactRating: null,
    guaranteeRating: null,
    supplierId: null,
    contactInfo: null,
    billingInfo: null,
    fuelMix: null,
    guaranteeList: null,
    openingHours: null,
    slug: null,
  },
};

const mapSupplierToContentfulFields = (
  supplier,
  contentfulSupplier = emptyContentfulSupplier,
) => {
  contentfulSupplier.fields.name = { "en-GB": supplier.name };
  contentfulSupplier.fields.rank = { "en-GB": supplier.rank };
  contentfulSupplier.fields.complaintsNumber = {
    "en-GB": supplier.complaintsNumber,
  };
  contentfulSupplier.fields.complaintsRating = {
    "en-GB": supplier.complaintsRatings,
  };
  contentfulSupplier.fields.dataAvailable = { "en-GB": !supplier.isSmall };
  contentfulSupplier.fields.overallRating = { "en-GB": supplier.overallRating };
  contentfulSupplier.fields.contactEmail = { "en-GB": supplier.contactEmail };
  contentfulSupplier.fields.contactRating = { "en-GB": supplier.contactRating };
  contentfulSupplier.fields.contactTime = { "en-GB": supplier.contactTime };
  contentfulSupplier.fields.contactSocialMedia = {
    "en-GB": supplier.contactSocialMedia,
  };
  contentfulSupplier.fields.guaranteeRating = {
    "en-GB": supplier.guaranteeRating,
  };
  contentfulSupplier.fields.supplierId = { "en-GB": parseInt(supplier.id, 10) };
  contentfulSupplier.fields.contactInfo = {
    "en-GB": markdownToJson(supplier.contactInfo),
  };
  contentfulSupplier.fields.billingInfo = {
    "en-GB": markdownToJson(supplier.billingInfo),
  };
  contentfulSupplier.fields.fuelMix = {
    "en-GB": markdownToJson(supplier.fuelMix),
  };
  contentfulSupplier.fields.guaranteeList = {
    "en-GB": markdownToJson(supplier.guaranteesList, { stripWhitespace: true }),
  };
  contentfulSupplier.fields.openingHours = {
    "en-GB": markdownToJson(supplier.openingHours),
  };
  contentfulSupplier.fields.slug = {
    "en-GB": slugify(supplier.name),
  };

  if (supplier.whitelabelSupplierContentfulId) {
    contentfulSupplier.fields["whitelabelSupplier"] = {
      "en-GB": {
        sys: {
          type: "Link",
          linkType: "Entry",
          id: supplier.whitelabelSupplierContentfulId,
        },
      },
    };
  }

  return contentfulSupplier;
};

export default mapSupplierToContentfulFields;
