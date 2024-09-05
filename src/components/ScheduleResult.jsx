import { Table } from "@contentful/f36-components";
import { useSelector } from "react-redux";

const ScheduleResult = ({ contentfulId }) => {
  const error = useSelector((state) => state.contentfulErrors.value);
  console.log(error);

  return <Table.Cell>{contentfulId}</Table.Cell>;
};

export default ScheduleResult;
