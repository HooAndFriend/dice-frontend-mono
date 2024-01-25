"use client";

// ** Service Imports
import SwrProvider from "@/components/provider/swr-provider";

// ** Component Imports
import DashboardContainerView from "./dashboard-container";

const DashboardContainer = () => {
  return (
    <SwrProvider>
      <DashboardContainerView />
    </SwrProvider>
  );
};

export default DashboardContainer;
