"use client";

import {GetCommentListResponse, GetIssueListResponse} from "@/src/type/qa";
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

  const {
    data: issueData,
    error: issueError,
    isLoading: issueLoading,
  } = useSWR(`/v1/qa?status=ALL&qaId=${qaId}`, async url =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useSWR(`/v1/qa/comment/${qaId}`, async url =>
    Get<GetCommentListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );

  if (issueLoading && commentLoading) return null;

  if (!commentData) {
    return null;
  }

  return (
    <IssueDetailView
      data={issueData.data.qa[0]}
      commentData={commentData.data.data}
    />
  );
};

export default IssueDetail;
