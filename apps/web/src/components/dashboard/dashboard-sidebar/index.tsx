"use client";

// ** React Imports
import { useMemo } from "react";

// ** Component Imports
import DashboardSidebardView from "./dashboard-sidebar";
import { MenuList } from "@/src/constants/menu";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";
import { isUndefined } from "loadsh";

const DashboardSidebard = () => {
  const { workspaceFunction } = useRecoilValue(WorkspaceState);

  const sidbarMenuList = useMemo(
    () =>
      isUndefined(workspaceFunction)
        ? []
        : MenuList.filter((item) =>
            workspaceFunction.find((_) => _.function === item.name)
          ),
    [workspaceFunction]
  );

  return <DashboardSidebardView sidbarMenuList={sidbarMenuList} />;
};

export default DashboardSidebard;
