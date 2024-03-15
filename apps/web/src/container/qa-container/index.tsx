"use client";

import QaContainerView from "./qa-container";
import { useEffect, useState } from "react";

import { Get } from "@/src/repository";
import useSWR from "swr";
import { GetIssueListResponse, QaQuery } from "@/src/type/qa";
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";
import { EpicStatus } from "@/src/type/epic";
import useInput from "@/src/hooks/useInput";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<EpicStatus>("ALL");

  const {
    data: query,
    handleInput,
    handleSelect,
  } = useInput<QaQuery>({ type: "title", value: "" });

  const [qaId, setQaId] = useState<number>(0);

  const handleOpenQa = (id: number) => {
    setQaId(id);
    setOpen(true);
  };

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading } = useSWR("/v1/qa", async (url) =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
      params: {
        status,
      },
    })
  );

  if (isLoading) return null;

  return (
    <QaContainerView
      open={open}
      status={status}
      data={data.data.qa}
      qaId={qaId}
      query={query}
      handleSelect={handleSelect}
      handleInput={handleInput}
      setStatus={setStatus}
      handleOpenQa={handleOpenQa}
    />
  );
};

export default QaContainer;
