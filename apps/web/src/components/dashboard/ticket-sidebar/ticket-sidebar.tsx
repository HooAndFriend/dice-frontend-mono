import { MenuType } from "@/src/constants/menu";
import TicketMenuItem from "../ticket-menu-item";

interface PropsType {
  sidebarMenuList: MenuType[];
}

const TicketSidebarView = ({ sidebarMenuList }: PropsType) => {
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

export default TicketSidebarView;
