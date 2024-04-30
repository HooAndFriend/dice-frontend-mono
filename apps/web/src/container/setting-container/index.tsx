"use client";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import { Delete, Get, Patch } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import {
  GetTicketSettingListResponse,
  SettingListInfo,
} from "@/src/type/ticket";
import { useEffect } from "react";

const SettingConatiner = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/v1/ticket/setting",
    async (url) => {
      return await Get<GetTicketSettingListResponse>(url);
    }
  );

  const handleTicketSetting = async (data: SettingListInfo) => {
    await Patch("/v1/ticket/setting", {
      settingId: data.id,
      color: data.color,
      textColor: data.textColor,
      type: data.type,
      description: data.description,
    })
      .then((res) => {
        mutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTicketDelete = async (id: number) => {
    await Delete(`/v1/ticket/setting/${id}`).then((res) => {
      mutate();
    });
  };

  useEffect(() => {
    mutate();
  }, [data]);

  if (isLoading) return;

  if (error) return;

  return (
    <SettingContainerView
      handleTicketDelete={handleTicketDelete}
      handleTicketSetting={handleTicketSetting}
      data={data.data.data}
    />
  );
};

export default SettingConatiner;
