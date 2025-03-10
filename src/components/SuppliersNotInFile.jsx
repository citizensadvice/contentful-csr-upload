import React from "react";
import { useSelector } from "react-redux";
import { getContentfulSuppliersNotInFile } from "../selectors";
import {
  Box,
  Heading,
  Paragraph,
  Table,
  TextLink,
} from "@contentful/f36-components";
import { getType } from "../helpers/getType";
import LoadingTableRows from "./LoadingTableRows";
import { FETCHED_CONTENTFUL_SUPPLIERS } from "../constants/app-status";
import { useSDK } from "@contentful/react-apps-toolkit";

const SuppliersNotInFile = () => {
  const sdk = useSDK();
  const suppliersNotInFile = useSelector(getContentfulSuppliersNotInFile);

  const renderSuppliersNotInFile = () => {
    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Supplier from Contentful</Table.Cell>
            <Table.Cell>Type</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <LoadingTableRows
            showOnStatus={FETCHED_CONTENTFUL_SUPPLIERS}
            rowCount={3}
            colCount={2}
          >
            {suppliersNotInFile.map((pair) => {
              return (
                <Table.Row key={pair.contentfulSupplier.name}>
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
                    {getType(!pair.contentfulSupplier.dataAvailable)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </LoadingTableRows>
        </Table.Body>
      </Table>
    );
  };

  return (
    <Box marginTop="spacingXl" marginBottom="spacingXl">
      <Heading as="h2">Suppliers to be unpublished</Heading>
      <Paragraph marginBottom="spacingL">
        These suppliers are not in the spreadsheet but are in Contentful and
        currently showing on the energy table. Nothing will happen to them yet.
      </Paragraph>
      {suppliersNotInFile && suppliersNotInFile.length > 0 ? (
        renderSuppliersNotInFile()
      ) : (
        <Paragraph>
          There are no suppliers already in Contentful that are missing from the
          spreadsheet.
        </Paragraph>
      )}
    </Box>
  );
};

export default SuppliersNotInFile;
