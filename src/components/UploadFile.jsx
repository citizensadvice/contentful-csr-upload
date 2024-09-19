import React from "react";
import Papa from "papaparse";
import { FormControl, TextInput } from "@contentful/f36-components";
import { useDispatch } from "react-redux";

import createSupplierFromCsv from "../helpers/createSupplierFromCsv";
import { addSupplier, resetSuppliers } from "../state/supplierSlice";
import { setErrors, resetErrors } from "../state/uploadErrorsSlice";
import { setAppStatus } from "../state/appStatusSlice";
import { PARSING_FINISHED } from "../constants/app-status";

const UploadFile = () => {
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    dispatch(resetSuppliers());
    dispatch(resetErrors());

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results) => {
        results.data.forEach((row) => {
          const supplier = createSupplierFromCsv(row);
          dispatch(addSupplier(supplier));
        });

        dispatch(setErrors(results.errors));
        dispatch(setAppStatus(PARSING_FINISHED));
      },
    });
  };

  return (
    <FormControl>
      <FormControl.Label>Choose a .csv file</FormControl.Label>
      <TextInput type="file" onChange={(e) => changeHandler(e)} />
    </FormControl>
  );
};

export default UploadFile;
