import React from "react";
import { useSelector } from "react-redux";
import { Workbench } from "@contentful/f36-workbench";
import UploadScreen from "../components/screens/UploadScreen";
import * as Screens from "../constants/screens";
import UploadSidebar from "../components/sidebars/UploadSidebar";
import MatchScreen from "../components/screens/MatchScreen";
import MatchSidebar from "../components/sidebars/MatchSidebar";
import ProcessScreen from "../components/screens/ProcessScreen";
import ProcessSidebar from "../components/sidebars/ProcessSidebar";
import ScheduleScreen from "../components/screens/ScheduleScreen";
import ScheduleSidebar from "../components/sidebars/ScheduleSidebar";

const Page = () => {
  const screen = useSelector((state) => state.screen.value);

  const renderScreen = () => {
    switch (screen) {
      case Screens.UPLOAD:
      default:
        return <UploadScreen></UploadScreen>;
      case Screens.MATCH:
        return <MatchScreen></MatchScreen>;
      case Screens.PROCESS:
        return <ProcessScreen></ProcessScreen>;
      case Screens.SCHEDULE:
        return <ScheduleScreen></ScheduleScreen>;
    }
  };

  const renderSidebar = () => {
    switch (screen) {
      case Screens.UPLOAD:
      default:
        return <UploadSidebar></UploadSidebar>;
      case Screens.MATCH:
        return <MatchSidebar></MatchSidebar>;
      case Screens.PROCESS:
        return <ProcessSidebar></ProcessSidebar>;
      case Screens.SCHEDULE:
        return <ScheduleSidebar></ScheduleSidebar>;
    }
  };

  return (
    <Workbench>
      <Workbench.Header title="Energy CSR Upload Tool"></Workbench.Header>
      <Workbench.Content>{renderScreen()}</Workbench.Content>
      <Workbench.Sidebar>{renderSidebar()}</Workbench.Sidebar>
    </Workbench>
  );
};

export default Page;
