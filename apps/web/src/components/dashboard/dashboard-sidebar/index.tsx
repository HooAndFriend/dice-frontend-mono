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
import { useWorkspaceStateSSR } from "@/src/app";

// ** Utils Imports
import { isUndefined } from "loadsh";

const DashboardSidebard = () => {
  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();

  const pathname = usePathname();

  const path = useMemo(
    () =>
      pathname.split("/")[2]
        ? `/dashboard/${pathname.split("/")[2]}`
        : "/dashboard",
    [pathname]
  );

  const sidbarMenuList = useMemo(
    () =>
      isUndefined(workspaceState.workspaceFunction)
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
              workspaceState.workspaceFunction.find(
                (_) => _.function === item.name
              )
            ),
          ].map((item) => {
            if (item.link === path) {
              return { ...item, isClicked: true };
            }
            return item;
          }),
    [workspaceState.workspaceFunction, path]
  );

  return <DashboardSidebardView sidbarMenuList={sidbarMenuList} />;
};

export default DashboardSidebard;
