"use client";

// ** Component Imports
import IssueDetailView from "./issue-detail";

// ** Service Imports
import useSWR from "swr";
import { Delete, Get, Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import {
  AddCommentParams,
  AddCommentResponse,
  GetCommentListResponse,
  GetIssueListResponse,
} from "@/src/type/qa";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  qaId: number;
  handleClose: () => void;
}

const IssueDetail = ({ qaId, handleClose }: PropsType) => {
  const { data: comment, handleInput } = useInput<AddCommentParams>({
    content: "",
    qaId,
  });

  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

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

  //댓글 등록
  const deleteQa = useSWRMutation(
    `/v1/qa/${qaId}`,
    async (url: string) =>
      await Delete<CommonResponse<void>>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": `${uuid}`,
        },
      }),
    {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
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
      deleteQa={deleteQa.trigger}
      handleClose={handleClose}
    />
  );
};

export default IssueDetail;
