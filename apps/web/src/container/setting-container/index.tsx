"use client";

// ** Component Imports
import {useRecoilValue} from "recoil";
import SettingContainerView from "./setting-container";
import {AuthState, WorkspaceState} from "@/src/app";
import useSWR from "swr";
import {Get} from "@/src/repository";
import {GetTicketListResponse} from "@/src/type/ticket";
import {useEffect} from "react";

const SettingConatiner = () => {
  const {accessToken} = useRecoilValue(AuthState);
  const {uuid} = useRecoilValue(WorkspaceState);

  const {data, error, isLoading, mutate} = useSWR(
    "/v1/ticket/setting",
    async url => {
      Get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": uuid,
        },
      });
    }
  );

  return <SettingContainerView />;
};

export default SettingConatiner;
