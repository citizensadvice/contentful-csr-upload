import markdownToJson from "./markdownToJson";
import { slugify } from "@contentful/field-editor-slug";

const emptyContentfulSupplier = {
  fields: {
    name: null,
    rank: null,
    complaintsNumber: null,
    complaintsRating: null,
    complaintsRatingScore: null,
    billAccuracyAndMeteringRating: null,
    billsAccuracySmart: null,
    billsAccuracyTraditional: null,
    smartOperating: null,
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
  contentfulSupplier = structuredClone(emptyContentfulSupplier),
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
    "en-GB": markdownToJson(supplier.billingInfo, { stripWhitespace: true }),
  };
  contentfulSupplier.fields.fuelMix = {
    "en-GB": markdownToJson(supplier.fuelMix, { stripWhitespace: true }),
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
  contentfulSupplier.fields.complaintsRatingScore = {
    "en-GB": supplier.complaintsRatingScore,
  };
  contentfulSupplier.fields.billAccuracyAndMeteringRating = {
    "en-GB": supplier.billAccuracyAndMeteringRating,
  };
  contentfulSupplier.fields.billsAccuracySmart = {
    "en-GB": supplier.billsAccuracySmart,
  };
  contentfulSupplier.fields.billsAccuracyTraditional = {
    "en-GB": supplier.billsAccuracyTraditional,
  };
  contentfulSupplier.fields.smartOperating = {
    "en-GB": supplier.smartOperating,
  };

  if (supplier.contactWebchatSync) {
    contentfulSupplier.fields.contactWebchatSync = {
      "en-GB": supplier.contactWebchatSync,
    };
  } else {
    contentfulSupplier.fields.contactWebchatSync = {
      "en-GB": "",
    };
  }

  if (supplier.contactWebchatAsync) {
    contentfulSupplier.fields.contactWebchatAsync = {
      "en-GB": supplier.contactWebchatAsync,
    };
  } else {
    contentfulSupplier.fields.contactWebchatAsync = {
      "en-GB": null,
    };
  }

  if (supplier.contactInAppSync) {
    contentfulSupplier.fields.contactInAppSync = {
      "en-GB": supplier.contactInAppSync,
    };
  } else {
    contentfulSupplier.fields.contactInAppSync = {
      "en-GB": "",
    };
  }

  if (supplier.contactInAppAsync) {
    contentfulSupplier.fields.contactInAppAsync = {
      "en-GB": supplier.contactInAppAsync,
    };
  } else {
    contentfulSupplier.fields.contactInAppAsync = {
      "en-GB": null,
    };
  }

  if (supplier.contactWhatsappSync) {
    contentfulSupplier.fields.contactWhatsappSync = {
      "en-GB": supplier.contactWhatsappSync,
    };
  } else {
    contentfulSupplier.fields.contactWhatsappSync = {
      "en-GB": "",
    };
  }

  if (supplier.contactWhatsappAsync) {
    contentfulSupplier.fields.contactWhatsappAsync = {
      "en-GB": supplier.contactWhatsappAsync,
    };
  } else {
    contentfulSupplier.fields.contactWhatsappAsync = {
      "en-GB": null,
    };
  }

  if (supplier.contactSmsSync) {
    contentfulSupplier.fields.contactSmsSync = {
      "en-GB": supplier.contactSmsSync,
    };
  } else {
    contentfulSupplier.fields.contactSmsSync = {
      "en-GB": "",
    };
  }

  if (supplier.contactSmsAsync) {
    contentfulSupplier.fields.contactSmsAsync = {
      "en-GB": supplier.contactSmsAsync,
    };
  } else {
    contentfulSupplier.fields.contactSmsAsync = {
      "en-GB": null,
    };
  }

  if (supplier.contactPortalSync) {
    contentfulSupplier.fields.contactPortalSync = {
      "en-GB": supplier.contactPortalSync,
    };
  } else {
    contentfulSupplier.fields.contactPortalSync = {
      "en-GB": "",
    };
  }

  if (supplier.contactPortalAsync) {
    contentfulSupplier.fields.contactPortalAsync = {
      "en-GB": supplier.contactPortalAsync,
    };
  } else {
    contentfulSupplier.fields.contactPortalAsync = {
      "en-GB": null,
    };
  }

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
