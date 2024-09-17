import { EntityStatusBadge, Table, TextLink } from "@contentful/f36-components";
import { useSelector } from "react-redux";
import { getMatchedSuppliersInContentful } from "../selectors";
import React from "react";
import LoadingTableCell from "./LoadingTableCell";
import { useSDK } from "@contentful/react-apps-toolkit";
import UpdateResult from "./UpdateResult";
import ScheduleResult from "./ScheduleResult";

const SuppliersToBeUpdated = () => {
  const suppliersToBeUpdated = useSelector(getMatchedSuppliersInContentful);
  const sdk = useSDK();

  if (suppliersToBeUpdated.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {suppliersToBeUpdated.map((pair) => (
        <Table.Row key={pair.supplier.id}>
          <Table.Cell>{pair.supplier.name}</Table.Cell>
          <LoadingTableCell status={pair.supplier.status}>
            <UpdateResult status={pair.supplier.status} />
          </LoadingTableCell>
          <LoadingTableCell status={pair.supplier.status}>
            <EntityStatusBadge entityStatus="changed" />
          </LoadingTableCell>
          <LoadingTableCell status={pair.supplier.status}>
            <EntityStatusBadge entityStatus="published" />
          </LoadingTableCell>
          <Table.Cell>
            <ScheduleResult
              id={pair.supplier.id}
              status={pair.supplier.status}
            />
          </Table.Cell>
          <Table.Cell>
            <TextLink
              onClick={() =>
                sdk.navigator.openEntry(pair.contentfulSupplier.contentfulId, {
                  slideIn: true,
                })
              }
            >
              View entry
            </TextLink>
          </Table.Cell>
        </Table.Row>
      ))}
    </React.Fragment>
  );
};

export default SuppliersToBeUpdated;
