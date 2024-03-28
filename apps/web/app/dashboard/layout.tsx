"use client";

// ** Next Imports
// import { useRouter } from "next/navigation";

// ** Component Imports
import DashboardSidebar from "@/src/components/Dashboard/DashboardSidebar";
import DashboardHeader from "@/src/components/Dashboard/DashboardHeader";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-screen">
      <DashboardHeader />
      <div
        className="flex flex-1 w-full h-calc(100vh - 70px"
        style={{ maxHeight: `calc(100% - 70px)` }}
      >
        <DashboardSidebar />
        <div className="flex-1 bg-[#FAFAFB] overflow-y-scroll overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardRayout;
