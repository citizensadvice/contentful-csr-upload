import React from "react";
import { List, ListItem, Paragraph } from "@contentful/f36-components";

const UploadErrors = ({ errors }) => {
  return (
    <React.Fragment>
      <Paragraph>
        Found {errors.length} problems in the <code>.csv</code> file:
      </Paragraph>
      <List>
        {errors.map((error) => (
          <ListItem key={error}>{error}</ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default UploadErrors;
