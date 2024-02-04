// ** Next Imports
import Link from "next/link";

// ** Component Imports
import WorkspacePopover from "@/src/components/popover/workspace-popover";
import DashboardSidebard from "@/src/components/dashboard/sidebar";

// ** Provider Imports
import RocoilRootProvider from "@/src/components/provider/recoil-provider";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <RocoilRootProvider>
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
          <DashboardSidebard />
          <div className="flex-1 bg-[#FAFAFB]">{children}</div>
        </div>
      </div>
    </RocoilRootProvider>
  );
};

export default DashboardRayout;
