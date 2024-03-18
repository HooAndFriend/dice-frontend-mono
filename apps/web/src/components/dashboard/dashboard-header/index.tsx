"use client";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Component Imports
import DashboardHeaderView from "./dashboard-header";

const DashboardHeader = () => {
  const { nickname } = useRecoilValue(UserState);

  return <DashboardHeaderView name={nickname} />;
};

export default DashboardHeader;
