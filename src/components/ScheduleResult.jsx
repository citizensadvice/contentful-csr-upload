import {
  Box,
  List,
  ListItem,
  Modal,
  Stack,
  Subheading,
  TextLink,
} from "@contentful/f36-components";
import { useSelector } from "react-redux";
import { getError } from "../selectors";
import { SCHEDULED_ACTION_PUT_ERROR } from "../constants/error-types";
import { MissingContent } from "@contentful/f36-components";
import React, { useState } from "react";
import { DoneIcon, ErrorCircleIcon } from "@contentful/f36-icons";
import { ACTION_SCHEDULED } from "../constants/supplier-status";

const ScheduleResult = ({ id, status }) => {
  const error = useSelector((state) =>
    getError(state, id, SCHEDULED_ACTION_PUT_ERROR),
  );
  const [showModal, setShowModal] = useState(false);

  const renderError = () => (
    <React.Fragment>
      <Stack flexDirection="row" alignItems="center">
        <ErrorCircleIcon variant="negative" />
        <TextLink variant="negative" onClick={() => setShowModal(true)}>
          Error
        </TextLink>
      </Stack>
      <Modal
        onClose={() => setShowModal(false)}
        isShown={showModal}
        size="fullScreen"
      >
        {() => (
          <>
            <Modal.Header
              title="Error from Contentful"
              onClose={() => setShowModal(false)}
            />
            <Modal.Content>
              <Box marginBottom="spacingXl">
                <Subheading>Error messages</Subheading>
                <List>
                  {JSON.parse(error.error).details.errors.map((e) => (
                    <ListItem key={e.details}>{e.details}</ListItem>
                  ))}
                </List>
              </Box>
              <Subheading>Response</Subheading>
              <code>
                <pre style={{ whiteSpace: "pre-wrap" }}>{error.error}</pre>
              </code>
            </Modal.Content>
          </>
        )}
      </Modal>
    </React.Fragment>
  );

  if (status === ACTION_SCHEDULED) {
    return (
      <Stack flexDirection="row" alignItems="center">
        <DoneIcon variant="positive" />
        <TextLink variant="positive">OK</TextLink>
      </Stack>
    );
  } else if (error) {
    return renderError();
  } else {
    return <MissingContent />;
  }
};

export default ScheduleResult;
