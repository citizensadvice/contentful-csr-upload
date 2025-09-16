import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Datepicker,
  DateTime,
  Paragraph,
  Stack,
  Text,
  TextInput,
} from "@contentful/f36-components";
import { WarningOctagonIcon } from "@contentful/f36-icons";
import { setAppStatus } from "../state/appStatusSlice";
import { setScheduleTime } from "../state/scheduleTimeSlice";
import { SCHEDULE_UPDATES, SCHEDULING_UPDATES } from "../constants/app-status";
import { useDispatch, useSelector } from "react-redux";
import { getAllContentfulActionsSuccessful } from "../selectors";

const SchedulingForm = () => {
  const dispatch = useDispatch();

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [time, setTime] = useState("00:01");
  const [error, setError] = useState();

  const appStatus = useSelector((state) => state.appStatus.value);
  const uploadsSuccessful = useSelector(getAllContentfulActionsSuccessful);
  const date = useSelector((state) => state.scheduleTime.value);

  const allowScheduling =
    appStatus !== SCHEDULING_UPDATES &&
    uploadsSuccessful &&
    error === undefined;

  useEffect(() => {
    setError();

    const [hours, minutes] = time.split(":");
    let newDate = new Date(selectedDay);
    newDate.setHours(hours, minutes);
    const parsedDate = Date.parse(newDate);

    if (Number.isNaN(parsedDate)) {
      setError("Enter a valid date and time (HH:MM)");
    } else {
      dispatch(setScheduleTime(newDate.toISOString()));
    }
  }, [selectedDay, time, dispatch]);

  return (
    <Box marginTop="spacingM">
      <Stack flexDirection="column" alignItems="start">
        <Datepicker selected={selectedDay} onSelect={setSelectedDay} />
        <TextInput
          type="text"
          aria-label="Enter time"
          placeholder="HH:MM"
          onBlur={(e) => setTime(e.target.value)}
          isInvalid={error}
          pattern="0..9"
        />
        {error ? (
          <Stack alignItems="top">
            <WarningOctagonIcon variant="negative" />
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
          onClick={() => dispatch(setAppStatus(SCHEDULE_UPDATES))}
        >
          Schedule Update
        </Button>
      </Stack>
    </Box>
  );
};

export default SchedulingForm;
