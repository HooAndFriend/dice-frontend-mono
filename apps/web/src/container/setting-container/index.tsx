"use client";

// ** Component Imports
import SettingContainerView from "./setting-container";

// ** Service Imports
import {Get} from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";

// ** Type Imports
import {GetTicketListResponse} from "@/src/type/ticket";
import {useEffect} from "react";

const SettingConatiner = () => {
  const {accessToken} = useRecoilValue(AuthState);
  const {uuid} = useRecoilValue(WorkspaceState);

  const {data, error, isLoading, mutate} = useSWR(
    "/v1/ticket/setting",
    async url => {
      return Get<GetTicketListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": uuid,
        },
      });
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  console.log(data.data.data);

  return <SettingContainerView data={data.data.data} />;
};

export default SettingConatiner;
