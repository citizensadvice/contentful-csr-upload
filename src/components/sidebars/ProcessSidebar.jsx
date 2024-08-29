import {
  Box,
  Button,
  Paragraph,
  SectionHeading,
  List,
  ListItem,
  Badge,
} from "@contentful/f36-components";
import { setScreen } from "../../state/screenSlice";
import { SCHEDULE } from "../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setAppStatus } from "../../state/appStatusSlice";
import * as AppStatus from "../../constants/app-status";
import {
  getMatchedSuppliersInContentful,
  getSuppliersNotInContentful,
} from "../../selectors";

const ProcessSidebar = () => {
  const dispatch = useDispatch();

  const suppliersInContentful = useSelector(getMatchedSuppliersInContentful);
  const suppliersNotInContentful = useSelector(getSuppliersNotInContentful);

  const clickHandler = () => {
    dispatch(setAppStatus(AppStatus.PROCESS_SUPPLIERS));
    dispatch(setScreen(SCHEDULE));
  };

  return (
    <React.Fragment>
      <SectionHeading>PROCESS SUPPLIERS</SectionHeading>
      <Box marginTop="spacingM">
        <Paragraph marginBottom="spacingM">
          When you click 'Process suppliers':
        </Paragraph>
        <List>
          <ListItem>
            {suppliersInContentful.length} suppliers will be updated and set to
            <Badge as="span" variant="primary">
              Changed
            </Badge>
          </ListItem>
          <ListItem>
            {suppliersNotInContentful.length} suppliers will be created and set
            to
            <Badge as="span" variant="warning">
              Draft
            </Badge>
          </ListItem>
        </List>
      </Box>
      <Paragraph marginTop="spacingM">
        Nothing will be published or archived
      </Paragraph>
      <Box marginTop="spacingM">
        <Button variant="primary" onClick={() => clickHandler()}>
          Process suppliers
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ProcessSidebar;
