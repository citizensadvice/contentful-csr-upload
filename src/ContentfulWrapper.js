import mapSupplierToContentfulFields from "./helpers/mapSupplierToContentfulFields";

const getPublishedSuppliers = async (cma) => {
  const space = await cma.getSpace(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID,
  );
  const env = await space.getEnvironment(
    import.meta.env.VITE_REACT_APP_CONTENTFUL_ENV,
  );
  return await env.getEntries({
    content_type: "energySupplier",
  });
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

export { getPublishedSuppliers, updateSupplier, createSupplier };
