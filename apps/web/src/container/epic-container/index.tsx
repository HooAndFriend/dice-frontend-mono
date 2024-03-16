"use client";

// ** Component Imports
import EpicContainerView from "./epic-container";

// ** Recoil Imports
import { useAuthStateSSR, useWorkspaceStateSSR } from "@/src/app";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetEpicListResponse } from "@/src/type/epic";

const EpicConatiner = () => {
  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR("/v1/ticket/epic", async (url) =>
    Get<GetEpicListResponse>(url, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "workspace-code": workspaceState.uuid,
      },
    })
  );

  if (isLoading) return;

  return <EpicContainerView epicData={data.data.epic} />;
};

export default EpicConatiner;
