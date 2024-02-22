"use client";

import QaContainerView from "./qa-container";
import { useEffect, useState } from "react";

import { Get } from "@/src/repository";
import useSWR from "swr";
import { GetIssueListResponse } from "@/src/type/qa";
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [qaId, setQaId] = useState<number>();

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const handleCreateIssueOpen = () => {
    setDetail(false);
    setOpen((cur) => !cur);
  };

  const handleIssueDetailOpen = (id) => {
    setOpen(false);
    setDetail((cur) => !cur);
    setQaId(id);
  };

  const { data, error, isLoading } = useSWR("/v1/qa?status=ALL", async (url) =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );
  if (isLoading) return null;

  return (
    <QaContainerView
      openCreateIssue={open}
      openIssueDetail={detail}
      handleCreateIssueOpen={handleCreateIssueOpen}
      handleIssueDetailOpen={handleIssueDetailOpen}
      qaId={qaId}
      data={data.data.qa}
    />
  );
};

export default QaContainer;
