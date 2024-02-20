import TicketIcon from "@/public/svg/ticket.svg";
import QaIcon from "@/public/svg/qa.svg";

export interface MenuType {
  id: number;
  name: string;
  link: string;
  icon: React.FC<{ className: string }>;
  isClicked: boolean;
}

export const MenuList = [
  {
    id: 1,
    name: "TICKET",
    link: "/dashboard/epic",
    icon: TicketIcon,
    isClicked: false,
  },
  {
    id: 2,
    name: "QA",
    link: "/dashboard/qa",
    icon: QaIcon,
    isClicked: false,
  },
];
