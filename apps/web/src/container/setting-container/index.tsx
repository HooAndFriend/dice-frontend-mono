"use client";
// ** React Imports
import { useState } from "react";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import { Get, Patch } from "@/src/repository";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import {
  GetTicketSettingListResponse,
  SettingListInfo,
  TicketSettingType,
} from "@/src/type/ticket";
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const SettingConatiner = () => {
  const [data, setData] = useState<SettingListInfo[]>([]);

  const { handleOpen } = useDialog();

  const { mutate, isLoading } = useSWR(
    "/v1/ticket/setting",
    async (url) => {
      return await Get<GetTicketSettingListResponse>(url);
    },
    { onSuccess: (data) => setData(data.data.data) }
  );

  const updateTicketSetting = useSWRMutation(
    "/v1/ticket/setting",
    async (url: string) =>
      await Patch<CommonResponse<void>>(url, {
        data: data.map((item) => ({ ...item, settingId: item.id })),
      }),
    {
      onSuccess: () => {
        mutate();
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const handleData = (
    id: number,
    value: string | TicketSettingType,
    type: "name" | "type" | "description"
  ) => {
    setData((cur) =>
      cur.map((item) => (item.id === id ? { ...item, [type]: value } : item))
    );
  };

  return (
    <SettingContainerView
      data={data}
      handleData={handleData}
      updateTicketSetting={updateTicketSetting.trigger}
      refetch={mutate}
      isLoading={isLoading}
    />
  );
};

export default SettingConatiner;
