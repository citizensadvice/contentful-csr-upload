import React from "react";
import { useSelector } from "react-redux";
import { getMatchedSuppliersInContentful } from "../selectors";
import {
  Badge,
  Box,
  EntityStatusBadge,
  Heading,
  Paragraph,
  Table,
  TextLink,
} from "@contentful/f36-components";
import { getType } from "../helpers/getType";
import LoadingTableRows from "./LoadingTableRows";
import { FETCHED_CONTENTFUL_SUPPLIERS } from "../constants/app-status";
import { useSDK } from "@contentful/react-apps-toolkit";

const SuppliersInFileAndContentful = () => {
  const sdk = useSDK();

  const suppliersInFileAndContentful = useSelector(
    getMatchedSuppliersInContentful,
  );

  const renderMatchedSuppliers = () => {
    return (
      <React.Fragment>
        <Paragraph marginBottom="spacingL">
          These suppliers are in the spreadsheet and have been found in
          Contentful by matching their <code>SupplierId</code> value. They will
          be updated and set to{" "}
          <Badge as="span" variant="primary">
            Changed
          </Badge>
        </Paragraph>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Supplier from spreadsheet</Table.Cell>
              <Table.Cell>Supplier in Contentful</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Type</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <LoadingTableRows
              colCount={3}
              rowCount={3}
              showOnStatus={FETCHED_CONTENTFUL_SUPPLIERS}
            >
              {suppliersInFileAndContentful.map((pair) => {
                return (
                  <Table.Row key={pair.supplier.id}>
                    <Table.Cell>{pair.supplier.name}</Table.Cell>
                    <Table.Cell>
                      <TextLink
                        onClick={() =>
                          sdk.navigator.openEntry(
                            pair.contentfulSupplier.contentfulId,
                            {
                              slideIn: true,
                            },
                          )
                        }
                      >
                        {pair.contentfulSupplier.name}
                      </TextLink>
                    </Table.Cell>
                    <Table.Cell>
                      <EntityStatusBadge
                        entityStatus={pair.contentfulSupplier.status}
                      />
                    </Table.Cell>
                    <Table.Cell>{getType(pair.supplier.isSmall)}</Table.Cell>
                  </Table.Row>
                );
              })}
            </LoadingTableRows>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  };

  return (
    <Box marginTop="spacingXl" marginBottom="spacingXl">
      <Heading as="h2">Suppliers to be updated</Heading>
      {suppliersInFileAndContentful &&
      suppliersInFileAndContentful.length > 0 ? (
        renderMatchedSuppliers()
      ) : (
        <Paragraph>
          There are no suppliers in the spreadsheet that aren't already in
          Contentful.
        </Paragraph>
      )}
    </Box>
  );
};

export default SuppliersInFileAndContentful;
