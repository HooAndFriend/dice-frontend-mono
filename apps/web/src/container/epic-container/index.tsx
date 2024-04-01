"use client";

// ** Component Imports
import EpicContainerView from "./epic-container";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetEpicListResponse } from "@/src/type/epic";
import { useState } from "react";

const EpicConatiner = () => {
  const [word, setWord] = useState<string>("");

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR("/v1/ticket/epic", async (url) =>
    Get<GetEpicListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": uuid,
      },
    })
  );

  if (isLoading) return;

  if (error) return;

  return (
    <EpicContainerView
      epicData={data.data.data}
      epicCount={data.data.count}
      word={word}
      handleWord={(e) => setWord(e.target.value)}
    />
  );
};

export default EpicConatiner;
