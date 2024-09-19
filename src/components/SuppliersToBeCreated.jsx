import { EntityStatusBadge, Table, TextLink } from "@contentful/f36-components";
import { useSelector } from "react-redux";
import { getSuppliersNotInContentful } from "../selectors";
import React from "react";
import LoadingTableCell from "./LoadingTableCell";
import { useSDK } from "@contentful/react-apps-toolkit";
import UpdateResult from "./UpdateResult";
import ScheduleResult from "./ScheduleResult";

const SuppliersToBeCreated = () => {
  const suppliersToBeCreated = useSelector(getSuppliersNotInContentful);
  const sdk = useSDK();

  if (suppliersToBeCreated.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {suppliersToBeCreated.map((pair) => (
        <Table.Row key={pair.supplier.name}>
          <Table.Cell>{pair.supplier.name}</Table.Cell>
          <LoadingTableCell status={pair.supplier.status}>
            <UpdateResult status={pair.supplier.status} />
          </LoadingTableCell>
          <LoadingTableCell status={pair.supplier.status}>
            <EntityStatusBadge entityStatus="draft" />
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
                sdk.navigator.openEntry(pair.supplier.newContentfulId, {
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

export default SuppliersToBeCreated;
