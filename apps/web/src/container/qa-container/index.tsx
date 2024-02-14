"use client";

import SwrProvider from "@/src/components/provider/swr-provider";
import QaContainerView from "./qa-container";
import {useEffect, useState} from "react";

import {Get} from "@/src/repository";
import useSWR from "swr";
import {GetIssueListResponse} from "@/src/type/qa";
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";
import IssueDetail from "./components/issue-detail";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);

  const {uuid} = useRecoilValue(WorkspaceState);
  const {accessToken} = useRecoilValue(AuthState);

  const handleCreateIssueOpen = () => {
    setDetail(false);
    setOpen(cur => !cur);
  };

  const handleIssueDetailOpen = () => {
    setOpen(false);
    setDetail(cur => !cur);
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
        openIssueDetail={detail}
        handleCreateIssueOpen={handleCreateIssueOpen}
        handleIssueDetailOpen={handleIssueDetailOpen}
        data={data.data.qa}
      />
    </SwrProvider>
  );
};

export default QaContainer;
