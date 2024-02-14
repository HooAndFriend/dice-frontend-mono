"use client";

import {GetIssueListResponse} from "@/src/type/qa";
import IssueDetailView from "./issue-detail";
import useSWR from "swr";
import {Get} from "@/src/repository";
import {useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";

interface PropsType {
  qaId: number;
}

const IssueDetail = ({qaId}: PropsType) => {
  const {accessToken} = useRecoilValue(AuthState);
  const {uuid} = useRecoilValue(WorkspaceState);

  const {data, error, isLoading} = useSWR(
    `/v1/qa?status=ALL&qaId=${qaId}`,
    async url =>
      Get<GetIssueListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": `${uuid}`,
        },
      })
  );

  if (isLoading) return null;

  console.log(data.data.qa);

  return <IssueDetailView data={data.data.qa[0]} />;
};

export default IssueDetail;
