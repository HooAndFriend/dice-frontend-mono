"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** React Imports
import { useMemo } from "react";

// ** Component Imports
import TicketSidebarView from "./ticket-sidebar";
import TicketIcon from "@/public/svg/ticket-icon.svg";
import EpicIcon from "@/public/svg/epic-icon.svg";
import SprintIcon from "@/public/svg/sprint-icon.svg";

const TicketSidebar = () => {
  const pathname = usePathname();

  const sidebarMenuList = useMemo(
    () =>
      [
        {
          id: 1,
          name: "Epic",
          link: "/dashboard/ticket",
          icon: EpicIcon,
          isClicked: false,
        },
        {
          id: 2,
          name: "Ticket",
          link: "/dashboard/ticket/ticket",
          icon: TicketIcon,
          isClicked: false,
        },
        {
          id: 3,
          name: "Sprint",
          link: "/dashboard/ticket/sprint",
          icon: SprintIcon,
          isClicked: false,
        },
      ].map((item) => {
        if (item.link === pathname) {
          return { ...item, isClicked: true };
        }
        return item;
      }),
    []
  );

  return <TicketSidebarView sidebarMenuList={sidebarMenuList} />;
};

export default TicketSidebar;
