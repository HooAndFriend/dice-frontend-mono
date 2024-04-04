"use client";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import { Delete, Get, Patch } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

// ** Type Imports
import { GetTicketSettingListResponse } from "@/src/type/ticket";
import { useEffect } from "react";

const SettingConatiner = () => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);

  const { data, error, isLoading, mutate } = useSWR(
    "/v1/ticket/setting",
    async (url) => {
      return await Get<GetTicketSettingListResponse>(url, {
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
    )
      .then((res) => {
        mutate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTicketDelete = async (id: number) => {
    await Delete(`/v1/ticket/setting/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": uuid,
      },
    }).then((res) => {
      mutate();
    });
  };

  useEffect(() => {
    mutate();
  }, [data]);

  if (isLoading) return null;

  return (
    <SettingContainerView
      handleTicketDelete={handleTicketDelete}
      handleTicketSetting={handleTicketSetting}
      data={data.data.data}
    />
  );
};

export default SettingConatiner;
