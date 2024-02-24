"use client";

// ** Next Imports
// import { useRouter } from "next/navigation";

// ** Component Imports
import DashboardSidebar from "@/src/components/Dashboard/dashboard-sidebar";
import DashboardHeader from "@/src/components/Dashboard/dashboard-header";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState } from "@/src/app";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // const { accessToken } = useRecoilValue(AuthState);

  // const router = useRouter();

  // if (accessToken === "") {
  //   router.push("/");
  // }

  return (
    <div className="flex flex-col w-full h-screen">
      <DashboardHeader />
      <div
        className="flex flex-1 w-full h-calc(100vh - 70px"
        style={{ maxHeight: `calc(100% - 70px)` }}
      >
        <DashboardSidebar />
        <div className="flex-1 bg-[#FAFAFB] overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default DashboardRayout;
