import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAppStatus } from "../../state/appStatusSlice";
import * as AppStatus from "../../constants/app-status";
import { getPublishedSuppliers } from "../../ContentfulWrapper";
import { addContentfulSupplier } from "../../state/contentfulSupplierSlice";
import SuppliersInFileAndContentful from "../SuppliersInFileAndContentful";
import SuppliersNotInContentful from "../SuppliersNotInContentful";
import SuppliersNotInFile from "../SuppliersNotInFile";
import { createClient } from "contentful-management";
import { useSDK } from "@contentful/react-apps-toolkit";
import { setWhitelabelSupplierId } from "../../state/supplierSlice";
import { getStatus } from "../../helpers/getStatus";

const ProcessScreen = () => {
  const sdk = useSDK();
  const cma = createClient({ apiAdapter: sdk.cmaAdapter });

  const status = useSelector((state) => state.appStatus.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === AppStatus.FETCHING_CONTENTFUL_SUPPLIERS) {
      getPublishedSuppliers(cma).then((suppliers) => {
        suppliers.forEach((s) => {
          try {
            dispatch(
              addContentfulSupplier({
                contentfulId: s.sys.id,
                id: parseInt(s.fields.supplierId["en-GB"], 10),
                name: s.fields.name["en-GB"],
                dataAvailable: s.fields.dataAvailable["en-GB"],
                status: getStatus(s),
              }),
            );

            if (
              s.fields.whitelabelSupplier &&
              s.fields.whitelabelSupplier["en-GB"]
            ) {
              dispatch(
                setWhitelabelSupplierId({
                  id: parseInt(s.fields.supplierId["en-GB"], 10),
                  whitelabelSupplierContentfulId:
                    s.fields.whitelabelSupplier["en-GB"].sys.id,
                }),
              );
            }
          } catch (error) {
            console.error(
              "Cannot create contentfulSupplier from Contentful data",
              { supplier: s, error: error },
            );
          }
        });
        dispatch(setAppStatus(AppStatus.FETCHED_CONTENTFUL_SUPPLIERS));
      });
    }
  }, [status, dispatch, cma]);

  return (
    <React.Fragment>
      <SuppliersInFileAndContentful />
      <SuppliersNotInContentful />
      <SuppliersNotInFile />
    </React.Fragment>
  );
};

export default ProcessScreen;
