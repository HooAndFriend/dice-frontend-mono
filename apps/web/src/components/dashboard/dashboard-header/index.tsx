"use client";

// ** Recoil Imports
import { useUserStateSSR } from "@/src/app";

// ** Component Imports
import DashboardHeaderView from "./dashboard-header";

const DashboardHeader = () => {
  const [userState, setUserState] = useUserStateSSR();

  return <DashboardHeaderView name={userState.nickname} />;
};

export default DashboardHeader;
