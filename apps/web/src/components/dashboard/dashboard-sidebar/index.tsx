"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** React Imports
import { useMemo } from "react";

// ** Component Imports
import DashboardSidebardView from "./dashboard-sidebar";
import { MenuList } from "@/src/constants/menu";
import DashboardIcon from "@/public/svg/dashboard.svg";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";
import { isUndefined } from "loadsh";

const DashboardSidebard = () => {
  const { workspaceFunction } = useRecoilValue(WorkspaceState);
  const pathname = usePathname();

  const sidbarMenuList = useMemo(
    () =>
      isUndefined(workspaceFunction)
        ? []
        : [
            {
              id: 0,
              name: "DASHBOARD",
              link: "/dashboard",
              icon: DashboardIcon,
              isClicked: false,
            },
            ,
            ...MenuList.filter((item) =>
              workspaceFunction.find((_) => _.function === item.name)
            ),
          ].map((item) => {
            if (item.link === pathname) {
              return { ...item, isClicked: true };
            }
            return item;
          }),
    [workspaceFunction, pathname]
  );

  return <DashboardSidebardView sidbarMenuList={sidbarMenuList} />;
};

export default DashboardSidebard;
