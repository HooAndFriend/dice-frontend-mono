"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** React Imports
import { useMemo } from "react";

// ** Component Imports
import TicketMenuItem from "../TicketMenuItem";
import TicketIcon from "@/public/svg/ticket-icon.svg";
import EpicIcon from "@/public/svg/epic-icon.svg";
import SprintIcon from "@/public/svg/sprint-icon.svg";
import SettintIcon from "@/public/svg/ticket-setting.svg";

const TicketSidebar = () => {
  const pathname = usePathname();

  const sidebarMenuList = useMemo(
    () =>
      [
        {
          id: 1,
          name: "Epic",
          link: "/dashboard/epic",
          icon: EpicIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: "Ticket",
          link: "/dashboard/epic/ticket",
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
          link: "/dashboard/epic/setting",
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
    <div className="w-[235px] bg-white border-r-2 border-[#EBEBEC]">
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
