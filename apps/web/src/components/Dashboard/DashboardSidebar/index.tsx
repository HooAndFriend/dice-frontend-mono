"use client";
// ** Next Imports
import { usePathname, useRouter } from "next/navigation";

// ** React Imports
import { useEffect, useMemo, useState } from "react";

// ** Component Imports
import MenuItem from "../../MenuItem";
import WorkspacePopover from "../../Popover/WorkspacePopover";
import { MenuList } from "@/src/constants/menu";
import DashboardIcon from "@/public/svg/dashboard.svg";

// ** Recoil Imports
import { TeamState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import { isUndefined } from "loadsh";
import TeamPopover from "../../Popover/TeamPopover";

const DashboardSidebard = () => {
  const { workspaceFunction, uuid } = useRecoilValue(WorkspaceState);
  const { uuid: teamUUid } = useRecoilValue(TeamState);

  const [path, setPath] = useState<string>("");
  const [sidbarMenuList, setSidbarMenuList] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const pathArray = pathname.split("/");

    setPath(pathArray[4] ? `/${pathArray[4]}` : "/");
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
        link: "/",
        icon: DashboardIcon,
        isClicked: false,
      },
      ,
      ...MenuList.filter((item) =>
        workspaceFunction.find((_) => _.function === item.name)
      ),
    ].map((item) => {
      if (item.link === path) {
        return {
          ...item,
          isClicked: true,
          link: `/dashboard/${teamUUid}/${uuid}/${item.link}`,
        };
      }
      return { ...item, link: `/dashboard/${teamUUid}/${uuid}/${item.link}` };
    });

    setSidbarMenuList(arr);
  }, [workspaceFunction, path]);

  useEffect(() => {
    if (pathname.split("/")[2] === "qa") {
      if (!workspaceFunction.find((_) => _.function === "QA")) {
        router.push("/dashboard");
      }
    }

    if (pathname.split("/")[2] === "epic") {
      if (!workspaceFunction.find((_) => _.function === "TICKET")) {
        router.push("/dashboard");
      }
    }
  }, [workspaceFunction]);

  return (
    <div className="w-[70px] border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div>
          <WorkspacePopover />
          {/* <TeamPopover /> */}
          {sidbarMenuList.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebard;
