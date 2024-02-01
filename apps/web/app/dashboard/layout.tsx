// ** Next Imports
import Link from "next/link";

// ** Component Imports
import MenuItem from "@/src/components/menu-item";
import WorkspacePopover from "@/src/components/popover/workspace-popover";
import ProfileBox from "@/src/components/profile-box";
import { MenuList } from "@/src/constants/menu";
import TeamPopover from "@/src/components/popover/team-popover";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en">
      <div className="flex flex-col h-screen">
        <div className="h-16 border-b-2 border-[#EBEBEC] flex items-center justify-between">
          <Link href="/dashboard">
            <img
              src="/images/logo.png"
              width="110px"
              height="30px"
              alt="logo"
              className="ml-[30px]"
            />
          </Link>
          <div className="flex items-center mr-[30px]">
            <WorkspacePopover />
            <h2>김인후</h2>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-[70px] border-r-2 border-[#EBEBEC]">
            <div className="flex justify-center h-4/5">
              <div>
                {MenuList.map((item) => (
                  <MenuItem {...item} alt="item" key={item.id} />
                ))}
              </div>
            </div>
            <div className="flex h-1/5">
              <div className="flex items-end justify-center flex-grow pb-3">
                <TeamPopover />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#FAFAFB]">{children}</div>
        </div>
      </div>
    </html>
  );
};

export default DashboardRayout;
