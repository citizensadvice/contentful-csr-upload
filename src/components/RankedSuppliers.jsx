import React from "react";
import { Box, Heading, Table } from "@contentful/f36-components";

const RankedSuppliers = ({ suppliers }) => {
  if (suppliers.length === 0) {
    return null;
  }
  return (
    <Box marginTop="spacingXl" marginBottom="spacingXl">
      <Heading as="h3">Ranked Suppliers ({suppliers.length})</Heading>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Supplier</Table.Cell>
            <Table.Cell>Rank</Table.Cell>
            <Table.Cell>Overall Rating</Table.Cell>
            <Table.Cell>Complaints Rating</Table.Cell>
            <Table.Cell>Contact Rating</Table.Cell>
            <Table.Cell>Guarantee Rating</Table.Cell>
            <Table.Cell>Expectation Rating</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {suppliers.map((s) => {
            return (
              <Table.Row key={s.id}>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.rank}</Table.Cell>
                <Table.Cell>{s.overallRating}</Table.Cell>
                <Table.Cell>{s.complaintsRatings}</Table.Cell>
                <Table.Cell>{s.contactRating}</Table.Cell>
                <Table.Cell>{s.guaranteeRating}</Table.Cell>
                <Table.Cell>{s.expectationRating}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Box>
  );
};

export default RankedSuppliers;
