// ** Component Imports
import { MenuType } from "@/src/constants/menu";
import MenuItem from "../../menu-item";
import TeamPopover from "../../popover/team-popover";
import DashboardIcon from "@/public/svg/dashboard.svg";

interface Props {
  sidbarMenuList: MenuType[];
}

const DashboardSidebardView = ({ sidbarMenuList }: Props) => {
  return (
    <div className="w-[70px] border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div>
          <MenuItem icon={DashboardIcon} link="/dashboard" isClicked={true} />
          {sidbarMenuList.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex h-1/5">
        <div className="flex items-end justify-center flex-grow pb-3">
          <TeamPopover />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebardView;
