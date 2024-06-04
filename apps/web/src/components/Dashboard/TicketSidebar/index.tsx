"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** React Imports
import { useMemo } from "react";

// ** Component Imports
import TicketMenuItem from "../TicketMenuItem";
import TicketIcon from "@/public/svg/ticket-icon.svg";
import EpicIcon from "@/public/svg/epic-icon.svg";
import SettintIcon from "@/public/svg/ticket-setting.svg";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

const TicketSidebar = () => {
  const { uuid: worksapceUid } = useRecoilValue(WorkspaceState);

  const pathname = usePathname();

  const sidebarMenuList = useMemo(
    () =>
      [
        {
          id: 1,
          name: "Gantt",
          link: `/dashboard/${worksapceUid}/task`,
          icon: EpicIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: "Sprint",
          link: `/dashboard/${worksapceUid}/task/sprint`,
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 3,
          name: "Kanban",
          link: `/dashboard/${worksapceUid}/task/kanban`,
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: "Table",
          link: `/dashboard/${worksapceUid}/task/table`,
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
          id: 5,
          name: "Setting",
          link: `/dashboard/${worksapceUid}/task/setting`,
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

  return (
    <div className="w-[180px] bg-white border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div className="w-full">
          {sidebarMenuList.map((item) => (
            <TicketMenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketSidebar;
