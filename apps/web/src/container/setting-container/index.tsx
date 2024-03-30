"use client";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import {Get, Patch} from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";

// ** Type Imports
import {GetTicketListResponse, SettingListInfo} from "@/src/type/ticket";
import {useEffect} from "react";

const SettingConatiner = () => {
  const {accessToken} = useRecoilValue(AuthState);
  const {uuid} = useRecoilValue(WorkspaceState);

  const {data, error, isLoading, mutate} = useSWR(
    "/v1/ticket/setting",
    async url => {
      return await Get<GetTicketListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": uuid,
        },
      });
    }
  );

  const handleTicketSetting = async (
    settingId: number,
    color: string,
    type: string,
    description: string
  ) => {
    await Patch(
      "/v1/ticket/setting",
      {
        settingId,
        color,
        type,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": uuid,
        },
      }
    ).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading) return null;

  return (
    <SettingContainerView
      handleTicketSetting={handleTicketSetting}
      data={data.data.data}
    />
  );
};

export default SettingConatiner;
