import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@contentful/f36-components";

const LoadingTable = ({ children, rowCount, colCount, showOnStatus }) => {
  const appStatus = useSelector((state) => state.appStatus.value);
  console.log(appStatus, showOnStatus);
  return appStatus === showOnStatus ? (
    children
  ) : (
    <Skeleton.Row rowCount={rowCount} columnCount={colCount} />
  );
};

export default LoadingTable;
