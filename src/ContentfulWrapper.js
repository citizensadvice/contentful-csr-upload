import mapSupplierToContentfulFields from "./helpers/mapSupplierToContentfulFields";

const getPublishedSuppliers = async (cma) => {
  const space = await cma.getSpace(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
  );
  const env = await space.getEnvironment(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_ENV,
  );

  let suppliers = await env.getEntries({
    content_type: "energySupplier",
    "metadata.tags.sys.id[nin]": "test",
  });

  // filter out archived suppliers
  return suppliers.items.filter((s) => s.isArchived() === false);
};

const updateSupplier = async (pair, cma) => {
  const space = await cma.getSpace(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
  );
  const env = await space.getEnvironment(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_ENV,
  );

  const contentfulSupplier = await env.getEntry(
    pair.contentfulSupplier.contentfulId,
  );

  mapSupplierToContentfulFields(pair.supplier, contentfulSupplier);
  console.log(pair.supplier);
  return contentfulSupplier.update();
};

const createSupplier = async (pair, cma) => {
  const space = await cma.getSpace(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
  );
  const env = await space.getEnvironment(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_ENV,
  );

  const contentfulFields = mapSupplierToContentfulFields(pair.supplier);

  return env.createEntry("energySupplier", contentfulFields);
};

const scheduleAction = async (id, iso_date, action, cma) => {
  const space = await cma.getSpace(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
  );
  const env = await space.getEnvironment(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_ENV,
  );

  return space.createScheduledAction({
    entity: {
      sys: {
        type: "Link",
        linkType: "Entry",
        id: id,
      },
    },
    environment: {
      sys: {
        type: "Link",
        linkType: "Environment",
        id: env.sys.id,
      },
    },
    action: action,
    scheduledFor: {
      datetime: iso_date,
      timezone: "Europe/London",
    },
  });
};

export {
  getPublishedSuppliers,
  updateSupplier,
  createSupplier,
  scheduleAction,
};
