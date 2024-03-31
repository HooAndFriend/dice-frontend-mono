"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** React Imports
import { useEffect, useMemo, useState } from "react";

// ** Component Imports
import MenuItem from "../../MenuItem";
import WorkspacePopover from "../../Popover/WorkspacePopover";
import { MenuList } from "@/src/constants/menu";
import DashboardIcon from "@/public/svg/dashboard.svg";

// ** Recoil Imports
import { WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import { isUndefined } from "loadsh";

const DashboardSidebard = () => {
  const { workspaceFunction } = useRecoilValue(WorkspaceState);

  const [path, setPath] = useState<string>("");
  const [sidbarMenuList, setSidbarMenuList] = useState([]);

  const pathname = usePathname();

  useEffect(() => {
    setPath(
      pathname.split("/")[2]
        ? `/dashboard/${pathname.split("/")[2]}`
        : "/dashboard",
    );
  }, [pathname]);

  useEffect(() => {
    if (isUndefined(workspaceFunction)) {
      setSidbarMenuList([]);

      return;
    }

    const arr = [
      {
        id: 0,
        name: "DASHBOARD",
        link: "/dashboard",
        icon: DashboardIcon,
        isClicked: false,
      },
      ,
      ...MenuList.filter((item) =>
        workspaceFunction.find((_) => _.function === item.name),
      ),
    ].map((item) => {
      if (item.link === path) {
        return { ...item, isClicked: true };
      }
      return item;
    });

    setSidbarMenuList(arr);
  }, [workspaceFunction, path]);

  return (
    <div className="w-[70px] border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div>
          {sidbarMenuList.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex h-1/5">
        <div className="flex items-end justify-center flex-grow pb-3">
          <WorkspacePopover />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebard;
