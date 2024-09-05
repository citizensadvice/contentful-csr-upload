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
  getContentfulIdsToBePublished,
  getContentfulSuppliersNotInFile,
} from "../../selectors";
import { setAppStatus } from "../../state/appStatusSlice";
import { scheduleAction } from "../../ContentfulWrapper";
import { useSDK } from "@contentful/react-apps-toolkit";
import { createClient } from "contentful-management";
import SchedulingForm from "../SchedulingForm";
import { addContentfulError } from "../../state/contentfulErrorsSlice";
import { SCHEDULED_ACTION_PUT_ERROR } from "../../constants/error-types";

const ScheduleSidebar = () => {
  const dispatch = useDispatch();
  const sdk = useSDK();
  const cma = createClient({ apiAdapter: sdk.cmaAdapter });

  const appStatus = useSelector((state) => state.appStatus.value);
  const date = useSelector((state) => state.scheduleTime.value);
  const contentfulIdsToPublish = useSelector(getContentfulIdsToBePublished);
  const suppliersToUnpublish = useSelector(getContentfulSuppliersNotInFile);
  const contentfulIdsToUnpublish = suppliersToUnpublish.map(
    (s) => s.contentfulSupplier.contentfulId,
  );

  useEffect(() => {
    if (appStatus === SCHEDULE_UPDATES) {
      const contentfulActions = [];

      contentfulIdsToPublish.forEach((id) => {
        contentfulActions.push(
          scheduleAction(id, date, "publish", cma).catch((error) => {
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

      contentfulIdsToUnpublish.forEach((id) => {
        contentfulActions.push(
          scheduleAction(id, date, "unpublish", cma).catch((error) => {
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
            {contentfulIdsToPublish.length} suppliers will be{" "}
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
