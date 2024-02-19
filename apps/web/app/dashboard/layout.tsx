// ** Component Imports
import DashboardSidebard from "@/src/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/src/components/dashboard/dashboard-header";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebard />
        <div className="flex-1 bg-[#FAFAFB]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardRayout;
