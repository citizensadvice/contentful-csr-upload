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
  Subheading,
  TextInput,
  Datepicker,
  EntityStatusBadge,
  DateTime,
  Text,
} from "@contentful/f36-components";
import { ErrorCircleIcon } from "@contentful/f36-icons";
import { useSelector } from "react-redux";
import { PROCESSED_SUPPLIERS } from "../../constants/app-status";

const ScheduleSidebar = () => {
  const appStatus = useSelector((state) => state.appStatus.value);

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
      setDate(newDate);
    }
  }, [selectedDay, time]);

  const allowScheduling =
    appStatus === PROCESSED_SUPPLIERS && error === undefined;

  return (
    <React.Fragment>
      <Box marginTop="spacingM">
        <SectionHeading>SCHEDULE PUBLISH / UNPUBLISH</SectionHeading>
        <Paragraph marginBottom="spacingM">After the event happens:</Paragraph>
        <List>
          <ListItem>
            20 suppliers will be <EntityStatusBadge entityStatus="published" />
          </ListItem>
          <ListItem>
            3 suppliers will be <Badge variant="warning">Draft</Badge>
          </ListItem>
        </List>
      </Box>
      <Box marginTop="spacingM">
        <Stack flexDirection="column">
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
            <Paragraph>
              Publishing / unpublishing will happen on <DateTime date={date} />
            </Paragraph>
          )}
          <Button variant="primary" isDisabled={!allowScheduling}>
            Schedule Update
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default ScheduleSidebar;
