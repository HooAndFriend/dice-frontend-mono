"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** Component Imports
import DashboardSidebard from "@/src/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/src/components/dashboard/dashboard-header";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState } from "@/src/app";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { accessToken } = useRecoilValue(AuthState);

  const router = useRouter();

  if (accessToken === "") {
    router.push("/");
  }

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
