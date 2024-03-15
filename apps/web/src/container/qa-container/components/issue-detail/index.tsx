"use client";

import {
  AddCommentParams,
  AddCommentResponse,
  GetCommentListResponse,
  GetIssueListResponse,
} from "@/src/type/qa";
import IssueDetailView from "./issue-detail";
import useSWR from "swr";
import { Get, Post } from "@/src/repository";
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";
import useInput from "@/src/hooks/useInput";
import useSWRMutation from "swr/mutation";

interface PropsType {
  qaId: number;
}

const IssueDetail = ({ qaId }: PropsType) => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);
  const { data: comment, handleInput } = useInput<AddCommentParams>({
    content: "",
    qaId: qaId,
  });

  const handleAdd = () => {
    if (comment.content === "") {
      alert("댓글을 입력해주세요");

      return;
    }

    addComment.trigger();
  };

  //댓글 등록
  const addComment = useSWRMutation(
    "/v1/qa/comment",
    async (url: string) =>
      await Post<AddCommentResponse>(
        url,
        { ...comment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        alert("댓글이 등록되었습니다");
      },
      onError: (error) => {
        console.log(error + " 등록 실패");
      },
    }
  );

  const {
    data: issueData,
    error: issueError,
    isLoading: issueLoading,
  } = useSWR(`/v1/qa?status=ALL&qaId=${qaId}`, async (url) =>
    Get<GetIssueListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );

  //댓글 확인
  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useSWR(
    `/v1/qa/comment/${qaId}`,
    async (url) =>
      Get<GetCommentListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": `${uuid}`,
        },
      }),
    {
      onSuccess: (status) => {
        console.log(status);
      },
    }
  );

  if (issueLoading && commentLoading) return null;

  if (!commentData) {
    return null;
  }

  return (
    <IssueDetailView
      data={issueData.data.qa[0]}
      commentData={commentData.data.data}
      comment={comment}
      handleAdd={handleAdd}
      handleInput={handleInput}
    />
  );
};

export default IssueDetail;
