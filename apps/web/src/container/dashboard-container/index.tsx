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
import useSWR from "swr";
import { Get } from "@/src/repository";
import { GetWorkspaceUserCountResponse } from "@/src/type/user";
import {
  GetDoneTaskCountResponse,
  GetTaskProgressResponse,
  GetTodayTaskCountResponse,
} from "@/src/type/workspace";

const DashboardContainer = () => {
  const [dates, setDates] = useState<Dates>({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
  });

  const { name } = useRecoilValue(WorkspaceState);

  const { data, isLoading } = useSWR("/v1/workspace-user/count", (url) =>
    Get<GetWorkspaceUserCountResponse>(url)
  );

  const { data: todayTaskData, isLoading: todayTaskDataLoading } = useSWR(
    "/v1/workspace/task/count",
    (url) => Get<GetTodayTaskCountResponse>(url)
  );

  const { data: doneTaskData, isLoading: doneTaskDataLoading } = useSWR(
    "/v1/workspace/task/done",
    (url) => Get<GetDoneTaskCountResponse>(url)
  );

  const { data: progressData, isLoading: progressDataLoading } = useSWR(
    "/v1/workspace/task/progress",
    (url) => Get<GetTaskProgressResponse>(url)
  );

  if (
    isLoading ||
    todayTaskDataLoading ||
    doneTaskDataLoading ||
    progressDataLoading
  )
    return;

  return (
    <DashboardContainerView
      name={name}
      dates={dates}
      workspaceUserCount={data.data}
      todayTaskData={todayTaskData.data}
      doneTaskData={doneTaskData.data}
      progressData={progressData.data}
    />
  );
};

export default DashboardContainer;
