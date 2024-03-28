"use client";

// ** React Imports
import { useState } from "react";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

// ** Utils Imports
import dayjs from "dayjs";

// ** Component Imports
import DashboardContainerView from "./dashboard-container";

// ** Type Imports
import { Dates } from "@/src/type/common";

const DashboardContainer = () => {
  const [dates, setDates] = useState<Dates>({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const { name } = useRecoilValue(WorkspaceState);
  return <h1></h1>;
  // return <DashboardContainerView name={name} dates={dates} />;
};

export default DashboardContainer;
