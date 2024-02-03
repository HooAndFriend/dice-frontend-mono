import DashboardIcon from "@/public/svg/dashboard.svg";
import TicketIcon from "@/public/svg/ticket.svg";
import QaIcon from "@/public/svg/qa.svg";
import { ReactNode } from "react";

export interface MenuType {
  id: number;
  link: string;
  icon: ReactNode;
  isClicked: boolean;
}

export const MenuList = [
  {
    id: 1,
    link: "/dashboard",
    icon: DashboardIcon,
    isClicked: true,
  },
  {
    id: 2,
    link: "/dashboard/ticket",
    icon: TicketIcon,
    isClicked: false,
  },
  {
    id: 3,
    link: "/dashboard/qa",
    icon: QaIcon,
    isClicked: false,
  },
];
