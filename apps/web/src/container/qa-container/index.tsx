"use client";

import SwrProvider from "@/src/components/provider/swr-provider";
import QaContainerView from "./qa-container";
import {useEffect, useState} from "react";

import {Get} from "@/src/repository";
import useSWR from "swr";
import {GetIssueListResponse} from "@/src/type/qa";
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {uuid} = useRecoilValue(WorkspaceState);
  const {accessToken} = useRecoilValue(AuthState);

  const handleCreateIssueOpen = () => {
    setOpen(cur => !cur);
  };

  const {data, error, isLoading} = useSWR("/v1/qa?status=ALL", async url =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );
  if (isLoading) return null;

  return (
    <SwrProvider>
      <QaContainerView
        openCreateIssue={open}
        handleCreateIssueOpen={handleCreateIssueOpen}
        data={data.data.qa}
      />
    </SwrProvider>
  );
};

export default QaContainer;
