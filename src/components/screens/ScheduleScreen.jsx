import React from "react";
import SuppliersToBeUpdated from "../SuppliersToBeUpdated";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatchedSuppliersInContentful,
  getSuppliersNotInContentful,
} from "../../selectors";
import { useEffect } from "react";
import {
  PROCESSED_SUPPLIERS,
  PROCESSING_SUPPLIERS,
} from "../../constants/app-status";
import { updateSupplier, createSupplier } from "../../ContentfulWrapper";
import { setSupplier } from "../../state/supplierSlice";
import {
  CONTENTFUL_PUT_ERROR,
  TO_BE_PUBLISHED,
} from "../../constants/supplier-status";
import { setAppStatus } from "../../state/appStatusSlice";
import { Box, Heading, Paragraph, Table } from "@contentful/f36-components";
import SuppliersToBeCreated from "../SuppliersToBeCreated";
import SuppliersToBeUnpublished from "../SuppliersToBeUnpublished";
import { useSDK } from "@contentful/react-apps-toolkit";
import { createClient } from "contentful-management";

const ScheduleScreen = () => {
  const sdk = useSDK();

  const cma = createClient({ apiAdapter: sdk.cmaAdapter });

  const dispatch = useDispatch();
  const status = useSelector((state) => state.appStatus.value);

  const suppliersToBeUpdated = useSelector(getMatchedSuppliersInContentful);
  const suppliersToBeCreated = useSelector(getSuppliersNotInContentful);

  useEffect(() => {
    if (status === PROCESSING_SUPPLIERS) {
      const contentfulActions = [];
      suppliersToBeUpdated.forEach((pair) => {
        contentfulActions.push(
          updateSupplier(pair, cma)
            .then(() => {
              dispatch(
                setSupplier({
                  supplierId: pair.supplier.id,
                  status: TO_BE_PUBLISHED,
                }),
              );
            })
            .catch((error) => {
              dispatch(
                setSupplier({
                  supplierId: pair.supplier.id,
                  status: CONTENTFUL_PUT_ERROR,
                }),
              );
              console.error(error.message);
            }),
        );
      });

      suppliersToBeCreated.forEach((pair) => {
        contentfulActions.push(
          createSupplier(pair, cma)
            .then((result) => {
              console.log(result);
              dispatch(
                setSupplier({
                  supplierId: pair.supplier.id,
                  newContentfulId: result.sys.id,
                  status: TO_BE_PUBLISHED,
                }),
              );
            })
            .catch((error) => {
              dispatch(
                setSupplier({
                  supplierId: pair.supplier.id,
                  status: CONTENTFUL_PUT_ERROR,
                }),
              );
              console.error(error.message);
            }),
        );
      });

      Promise.all(contentfulActions).then(() => {
        dispatch(setAppStatus(PROCESSED_SUPPLIERS));
      });
    }
  }, [suppliersToBeCreated, suppliersToBeUpdated, dispatch, status, cma]);

  return (
    <Box marginTop="spacingXl" marginBottom="spacingXl">
      <Heading as="h2">Suppliers to be published</Heading>
      <Paragraph>
        These are the entries that have changed or been created as part of this
        upload. No changes have been published.
      </Paragraph>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Supplier</Table.Cell>
            <Table.Cell>Current Status</Table.Cell>
            <Table.Cell>Status after events</Table.Cell>
            <Table.Cell>Result</Table.Cell>
            <Table.Cell>Action</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <SuppliersToBeUpdated />
          <SuppliersToBeCreated />
        </Table.Body>
      </Table>
      <SuppliersToBeUnpublished />
    </Box>
  );
};

export default ScheduleScreen;
