import { createSelector } from "@reduxjs/toolkit";
import { PARSING_FINISHED } from "../constants/app-status";
import {
  CONTENTFUL_PUT_ERROR,
  TO_BE_PUBLISHED,
} from "../constants/supplier-status";

export const getCanMatch = createSelector(
  [
    (state) => state.suppliers.value,
    (state) => state.uploadErrors.value,
    (state) => state.appStatus.value,
  ],
  (suppliers, errors, status) =>
    suppliers.length > 0 && errors.length === 0 && status === PARSING_FINISHED,
);

export const getSmallSuppliers = createSelector(
  (state) => state.suppliers.value,
  (suppliers) => suppliers.filter((s) => s.isSmall),
);

export const getRankedSuppliers = createSelector(
  (state) => state.suppliers.value,
  (suppliers) => suppliers.filter((s) => !s.isSmall),
);

export const getMatchedSuppliersInContentful = createSelector(
  [
    (state) => state.suppliers.value,
    (state) => state.contentfulSuppliers.value,
  ],
  (suppliers, contentfulSuppliers) => {
    return suppliers
      .map((s) => {
        return {
          supplier: s,
          contentfulSupplier: contentfulSuppliers.find((cs) => cs.id === s.id),
        };
      })
      .filter((pair) => pair.contentfulSupplier !== undefined);
  },
);

export const getSuppliersNotInContentful = createSelector(
  [
    (state) => state.suppliers.value,
    (state) => state.contentfulSuppliers.value,
  ],
  (suppliers, contentfulSuppliers) => {
    return suppliers
      .map((s) => {
        return {
          supplier: s,
          contentfulSupplier: contentfulSuppliers.find((cs) => cs.id === s.id),
        };
      })
      .filter((pair) => pair.contentfulSupplier === undefined);
  },
);

export const getContentfulSuppliersNotInFile = createSelector(
  [
    (state) => state.suppliers.value,
    (state) => state.contentfulSuppliers.value,
  ],
  (suppliers, contentfulSuppliers) => {
    return contentfulSuppliers
      .map((cs) => {
        return {
          supplier: suppliers.find((s) => s.id === cs.id),
          contentfulSupplier: cs,
        };
      })
      .filter((pair) => pair.supplier === undefined);
  },
);

export const getSuppliersToBePublished = createSelector(
  [
    (state) => state.suppliers.value,
    (state) => state.contentfulSuppliers.value,
  ],
  (suppliers, contentfulSuppliers) => {
    return suppliers
      .filter((s) => s.status === TO_BE_PUBLISHED)
      .map((s) => {
        return {
          supplier: s,
          contentfulSupplier: contentfulSuppliers.find((cs) => cs.id === s.id),
        };
      });
  },
);

export const getAllContentfulActionsSuccessful = createSelector(
  (state) => state.suppliers.value,
  (suppliers) => {
    return suppliers.every((s) => s.status !== CONTENTFUL_PUT_ERROR);
  },
);

export const getError = createSelector(
  [
    (state) => state.contentfulErrors.value,
    (state, id) => id,
    (state, id, errorType) => errorType,
  ],
  (contentfulErrors, id, errorType) =>
    contentfulErrors.find((e) => e.errorType === errorType && e.id === id),
);
