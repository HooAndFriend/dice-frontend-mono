"use client";

// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

// ** Type Imports
import { GetIssueListResponse, QaQuery } from "@/src/type/qa";
import { EpicStatus } from "@/src/type/epic";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Component Imports
import QaContainerView from "./qa-container";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [saveOpen, setSaveOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<EpicStatus>("ALL");

  const cancelButtonRef = useRef();

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

  const { data, error, isLoading, mutate } = useSWR("/v1/qa", async (url) =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
      params: {
        status,
        [query.type]: query.value,
      },
    })
  );

  useEffect(() => {
    mutate();
  }, [query, status]);

  if (isLoading) return null;

  return (
    <QaContainerView
      open={open}
      status={status}
      data={data.data.qa}
      count={data.data.count}
      qaId={qaId}
      query={query}
      handleSelect={handleSelect}
      handleInput={handleInput}
      setStatus={setStatus}
      handleOpenQa={handleOpenQa}
      cancelButtonRef={cancelButtonRef}
      saveOpen={saveOpen}
      setSaveOpen={setSaveOpen}
      refetch={mutate}
    />
  );
};

export default QaContainer;
