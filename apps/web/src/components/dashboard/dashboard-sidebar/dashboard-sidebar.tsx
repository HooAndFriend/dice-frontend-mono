// ** Component Imports
import { MenuType } from "@/src/constants/menu";
import MenuItem from "../../menu-item";
import WorkspacePopover from "../../popover/workspace-popover";

interface Props {
  sidbarMenuList: MenuType[];
}

const DashboardSidebardView = ({ sidbarMenuList }: Props) => {
  return (
    <div className="w-[70px] border-r-2 border-[#EBEBEC]">
      <div className="flex justify-center h-4/5">
        <div>
          {sidbarMenuList.map((item) => (
            <MenuItem {...item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex h-1/5">
        <div className="flex items-end justify-center flex-grow pb-3">
          <WorkspacePopover />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebardView;
