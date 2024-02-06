// ** Next Imports
import Link from "next/link";

// ** Component Imports
import DashboardSidebard from "@/src/components/dashboard/dashboard-sidebar";
import TeamPopover from "@/src/components/popover/team-popover";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";
import DashboardHeader from "@/src/components/dashboard/dashboard-header";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <RocoilRootProvider>
      <div className="flex flex-col h-screen">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebard />
          <div className="flex-1 bg-[#FAFAFB]">{children}</div>
        </div>
      </div>
    </RocoilRootProvider>
  );
};

export default DashboardRayout;
