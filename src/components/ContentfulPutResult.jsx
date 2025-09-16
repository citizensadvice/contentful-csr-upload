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
import { MissingContent } from "@contentful/f36-components";
import React, { useState } from "react";
import { CheckIcon, WarningOctagonIcon } from "@contentful/f36-icons";

const ContentfulPutResult = ({
  supplierId,
  supplierStatus,
  okStatus,
  displayErrorType,
}) => {
  const error = useSelector((state) =>
    getError(state, supplierId, displayErrorType),
  );
  const [showModal, setShowModal] = useState(false);

  const renderError = () => {
    const errorMessages = JSON.parse(error.error).details.errors;

    return (
      <React.Fragment>
        <Stack flexDirection="row" alignItems="center">
          <WarningOctagonIcon variant="negative" />
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
                {errorMessages ? (
                  <Box marginBottom="spacingXl">
                    <Subheading>Error messages</Subheading>
                    <List>
                      {errorMessages.map((e) => (
                        <ListItem key={errorMessages.indexOf(e)}>
                          {e.details}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : null}
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
  };

  if (okStatus.includes(supplierStatus)) {
    return (
      <Stack flexDirection="row" alignItems="center">
        <CheckIcon variant="positive" />
        <TextLink variant="positive">OK</TextLink>
      </Stack>
    );
  } else if (error) {
    return renderError();
  } else {
    return <MissingContent />;
  }
};

export default ContentfulPutResult;
