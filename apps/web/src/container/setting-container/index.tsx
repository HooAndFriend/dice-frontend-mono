"use client";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import { Delete, Get, Patch } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import { GetTicketSettingListResponse } from "@/src/type/ticket";

const SettingConatiner = () => {
  const { data, error, isLoading } = useSWR(
    "/v1/ticket/setting",
    async (url) => {
      return await Get<GetTicketSettingListResponse>(url);
    }
  );

  if (isLoading || error) return;

  return <SettingContainerView data={data.data.data} />;
};

export default SettingConatiner;
