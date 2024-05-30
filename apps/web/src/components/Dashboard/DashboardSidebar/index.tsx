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
import TicketMenuItem from "../TicketMenuItem";
import TicketIcon from "@/public/svg/ticket-icon.svg";
import EpicIcon from "@/public/svg/epic-icon.svg";
import SettintIcon from "@/public/svg/ticket-setting.svg";

// ** Recoil Imports
import { TeamState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import { isUndefined } from "loadsh";

const DashboardSidebard = () => {
  const {
    workspaceFunction,
    uuid: worksapceUid,
    name,
  } = useRecoilValue(WorkspaceState);
  const { uuid: teamUid } = useRecoilValue(TeamState);

  const [path, setPath] = useState<string>("");
  const [sidbarMenuList, setSidbarMenuList] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  const sidebarMenuList = useMemo(
    () =>
      [
        {
          id: 1,
          name: "Epic",
          link: `/dashboard/${teamUid}/${worksapceUid}/epic`,
          icon: EpicIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: "Ticket",
          link: `/dashboard/${teamUid}/${worksapceUid}/epic/ticket`,
          icon: TicketIcon,
          isClicked: false,
        },
        // {
        //   id: 3,
        //   name: "Sprint",
        //   link: "/dashboard/epic/sprint",
        //   icon: SprintIcon,
        //   isClicked: false,
        // },
        {
          id: 4,
          name: "Setting",
          link: `/dashboard/${teamUid}/${worksapceUid}/epic/setting`,
          icon: SettintIcon,
          isClicked: false,
        },
      ].map((item) => {
        if (item.link === pathname) {
          return { ...item, isClicked: true };
        }
        return item;
      }),
    [pathname]
  );

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
          link: `/dashboard/${teamUid}/${worksapceUid}/${item.link}`,
        };
      }
      return {
        ...item,
        link: `/dashboard/${teamUid}/${worksapceUid}/${item.link}`,
      };
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

  if (path === "/epic") {
    return (
      <div className="w-[250px] border-r-2 border-[#EBEBEC]">
        <div className="flex">
          <div className="w-[70px] flex justify-center">
            <WorkspacePopover />
          </div>
          <div className="flex items-center">
            <h1>{name}</h1>
          </div>
        </div>

        <div className="flex justify-center h-4/5 border-t-2 border-[#EBEBEC]">
          <div className="w-[70px] flex justify-center border-r-2 border-[#EBEBEC]">
            <div>
              {/* <TeamPopover /> */}
              {sidbarMenuList.map((item) => (
                <MenuItem {...item} key={item.id} />
              ))}
            </div>
          </div>
          <div className="w-[180px] border-[#EBEBEC]">
            <div className="flex justify-center h-4/5">
              <div className="w-full">
                {sidebarMenuList.map((item) => (
                  <TicketMenuItem {...item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
