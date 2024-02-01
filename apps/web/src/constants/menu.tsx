import DashboardIcon from "@/public/svg/dashboard.svg";
import TicketIcon from "@/public/svg/ticket.svg";
import QaIcon from "@/public/svg/qa.svg";
import { ReactNode } from "react";

export interface MenuType {
  id: number;
  link: string;
  image: string;
  icon: ReactNode;
}

export const MenuList = [
  {
    id: 1,
    link: "/dashboard",
    image: "/images/dashboard.png",
    icon: DashboardIcon,
  },
  {
    id: 2,
    link: "/dashboard/ticket",
    image: "/images/ticket.png",
    icon: TicketIcon,
  },
  {
    id: 3,
    link: "/dashboard/qa",
    image: "/images/qa.png",
    icon: QaIcon,
  },
];
