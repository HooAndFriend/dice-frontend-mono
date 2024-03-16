"use client";

// ** Component Imports
import { useRecoilValue } from "recoil";
import EpicContainerView from "./epic-container";
import { AuthState, WorkspaceState } from "@/src/app";
import useSWR from "swr";
import { Get } from "@/src/repository";
import { GetEpicListResponse } from "@/src/type/epic";

const EpicConatiner = () => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);

  const { data, error, isLoading } = useSWR("/v1/ticket/epic", async (url) =>
    Get<GetEpicListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": uuid,
      },
    })
  );

  if (isLoading) return;

  return <EpicContainerView epicData={data.data.epic} />;
};

export default EpicConatiner;
