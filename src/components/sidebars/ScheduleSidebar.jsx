import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  List,
  ListItem,
  Paragraph,
  SectionHeading,
  Stack,
  TextInput,
  Datepicker,
  EntityStatusBadge,
  DateTime,
  Text,
} from "@contentful/f36-components";
import { ErrorCircleIcon } from "@contentful/f36-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  PROCESSED_SUPPLIERS,
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

const ScheduleSidebar = () => {
  const dispatch = useDispatch();
  const sdk = useSDK();
  const cma = createClient({ apiAdapter: sdk.cmaAdapter });

  const appStatus = useSelector((state) => state.appStatus.value);
  const contentfulIdsToPublish = useSelector(getContentfulIdsToBePublished);
  const suppliersToUnpublish = useSelector(getContentfulSuppliersNotInFile);
  const contentfulIdsToUnpublish = suppliersToUnpublish.map(
    (s) => s.contentfulSupplier.contentfulId,
  );

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [time, setTime] = useState("00:01");

  const [date, setDate] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError();

    const [hours, minutes] = time.split(":");
    let newDate = new Date(selectedDay);
    newDate.setHours(hours, minutes);
    const parsedDate = Date.parse(newDate);

    if (Number.isNaN(parsedDate)) {
      setError("Enter a valid date and time (HH:SS)");
    } else {
      setDate(newDate.toISOString());
    }
  }, [selectedDay, time]);

  useEffect(() => {
    if (appStatus === SCHEDULE_UPDATES) {
      const contentfulActions = [];

      contentfulIdsToPublish.forEach((id) => {
        contentfulActions.push(scheduleAction(id, date, "publish", cma));
      });

      contentfulIdsToUnpublish.forEach((id) => {
        contentfulActions.push(scheduleAction(id, date, "unpublish", cma));
      });

      dispatch(setAppStatus(SCHEDULING_UPDATES));

      Promise.all(contentfulActions).then(() =>
        dispatch(setAppStatus(SCHEDULED_UPDATES)),
      );
    }
  });

  const allowScheduling =
    appStatus === PROCESSED_SUPPLIERS && error === undefined;

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
      <Box marginTop="spacingM">
        <Stack flexDirection="column" alignItems="start">
          <Datepicker selected={selectedDay} onSelect={setSelectedDay} />
          <TextInput
            type="text"
            placeholder="HH:MM"
            onBlur={(e) => setTime(e.target.value)}
            isInvalid={error}
            pattern="0..9"
          />
          {error ? (
            <Stack alignItems="top">
              <ErrorCircleIcon variant="negative" />
              <Text fontColor="red600">{error}</Text>
            </Stack>
          ) : (
            <React.Fragment>
              <Paragraph>Publishing / unpublishing will happen on:</Paragraph>
              <Paragraph>
                <strong>
                  <DateTime date={date} />
                </strong>
              </Paragraph>
            </React.Fragment>
          )}
          <Button
            variant="primary"
            isDisabled={!allowScheduling}
            onClick={() => dispatch(setAppStatus("SCHEDULE_UPDATES"))}
          >
            Schedule Update
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default ScheduleSidebar;
