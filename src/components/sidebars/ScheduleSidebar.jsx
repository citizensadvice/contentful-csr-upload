import React, { useEffect } from "react";
import {
  Badge,
  Box,
  List,
  ListItem,
  Paragraph,
  SectionHeading,
  EntityStatusBadge,
} from "@contentful/f36-components";
import { useDispatch, useSelector } from "react-redux";
import {
  SCHEDULE_UPDATES,
  SCHEDULED_UPDATES,
  SCHEDULING_UPDATES,
} from "../../constants/app-status";
import {
  getContentfulSuppliersNotInFile,
  getSuppliersToBePublished,
} from "../../selectors";
import { setAppStatus } from "../../state/appStatusSlice";
import { scheduleAction } from "../../ContentfulWrapper";
import { useSDK } from "@contentful/react-apps-toolkit";
import { createClient } from "contentful-management";
import SchedulingForm from "../SchedulingForm";
import { addContentfulError } from "../../state/contentfulErrorsSlice";
import { SCHEDULED_ACTION_PUT_ERROR } from "../../constants/error-types";
import { setSupplierStatus } from "../../state/supplierSlice";
import { ACTION_SCHEDULED } from "../../constants/supplier-status";

const ScheduleSidebar = () => {
  const dispatch = useDispatch();
  const sdk = useSDK();
  const cma = createClient({ apiAdapter: sdk.cmaAdapter });

  const appStatus = useSelector((state) => state.appStatus.value);
  const date = useSelector((state) => state.scheduleTime.value);
  const suppliersToPublish = useSelector(getSuppliersToBePublished);

  const suppliersToUnpublish = useSelector(getContentfulSuppliersNotInFile);
  const contentfulIdsToUnpublish = suppliersToUnpublish.map(
    (s) => s.contentfulSupplier.contentfulId,
  );

  useEffect(() => {
    if (appStatus === SCHEDULE_UPDATES) {
      const contentfulActions = [];

      suppliersToPublish.forEach((pair) => {
        contentfulActions.push(
          scheduleAction(
            pair.contentfulSupplier.contentfulId,
            date,
            "publish",
            cma,
          )
            .then(() => {
              dispatch(
                setSupplierStatus({
                  id: pair.supplier.id,
                  status: ACTION_SCHEDULED,
                }),
              );
            })
            .catch((error) => {
              dispatch(
                addContentfulError({
                  errorType: SCHEDULED_ACTION_PUT_ERROR,
                  error: error.message,
                  id: pair.supplier.id,
                }),
              );
            }),
        );
      });

      contentfulIdsToUnpublish.forEach((id) => {
        contentfulActions.push(
          scheduleAction(id, date, "unpublish", cma)
            .then(() => {
              dispatch(
                setSupplierStatus({
                  contentfulId: id,
                  status: ACTION_SCHEDULED,
                }),
              );
            })
            .catch((error) => {
              dispatch(
                addContentfulError({
                  errorType: SCHEDULED_ACTION_PUT_ERROR,
                  error: error.message,
                  contentfulId: id,
                }),
              );
            }),
        );
      });

      dispatch(setAppStatus(SCHEDULING_UPDATES));

      Promise.all(contentfulActions).then(() =>
        dispatch(setAppStatus(SCHEDULED_UPDATES)),
      );
    }
  });

  return (
    <React.Fragment>
      <Box marginTop="spacingM">
        <SectionHeading>SCHEDULE PUBLISH / UNPUBLISH</SectionHeading>
        <Paragraph marginBottom="spacingM">After the event happens:</Paragraph>
        <List>
          <ListItem>
            {suppliersToPublish.length} suppliers will be{" "}
            <EntityStatusBadge entityStatus="published" />
          </ListItem>
          <ListItem>
            {contentfulIdsToUnpublish.length} suppliers will be{" "}
            <Badge variant="warning">Draft</Badge>
          </ListItem>
        </List>
      </Box>
      <SchedulingForm />
    </React.Fragment>
  );
};

export default ScheduleSidebar;
