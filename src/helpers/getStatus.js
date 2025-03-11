export const getStatus = (supplier) => {
  let status = "unknown";

  if (supplier.isPublished()) {
    status = "published";
  }

  if (supplier.isDraft()) {
    status = "draft";
  }

  if (supplier.isUpdated()) {
    status = "changed";
  }

  if (supplier.isArchived()) {
    status = "archived";
  }

  return status;
};
