import React from "react";
import { Box, Heading, Paragraph } from "@contentful/f36-components";
import { useSelector } from "react-redux";

import UploadFile from "../UploadFile";
import UploadErrors from "../UploadErrors";

const UploadScreen = () => {
  const supplierCount = useSelector((state) => state.suppliers.value.length);
  const uploadErrors = useSelector((state) => state.uploadErrors.value);

  return (
    <Box marginTop="spacingL" marginBottom="spacingXl">
      <Heading as="h2">Upload the data file</Heading>
      <Paragraph>
        Upload the comma separated values (CSV) file that you have created from
        the energy data spreadsheet.
      </Paragraph>
      <UploadFile></UploadFile>
      {supplierCount > 0 ? (
        <Paragraph marginTop="spacingM">
          Found {supplierCount} suppliers
        </Paragraph>
      ) : null}

      {uploadErrors.length > 0 ? <UploadErrors errors={uploadErrors} /> : null}
    </Box>
  );
};

export default UploadScreen;
