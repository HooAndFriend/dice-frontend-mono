"use client";

// ** Component Imports
import QaCardView from "./QaCard";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Delete, Get, Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, UserState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import {
  AddCommentParams,
  AddCommentResponse,
  GetCommentListResponse,
  GetIssueListResponse,
  GetIssueResponse,
} from "@/src/type/qa";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { useState } from "react";

interface PropsType {
  qaId: number;
  handleClose: () => void;
}

const QaCard = ({ qaId, handleClose }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [mode, setMode] = useState<"view" | "edit">("view");

  const { uuid, role } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);
  const { email } = useRecoilValue(UserState);

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEdit = () => setMode("edit");

  const handleAdd = () => {
    if (comment === "") {
      handleOpen({
        title: "Error",
        message: "Enter Comment",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

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
        { content: comment, qaId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        setComment("");
        mutate("/v1/qa/comment");
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
  } = useSWR(`/v1/qa/${qaId}`, async (url) =>
    Get<GetIssueResponse>(url, {
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
  } = useSWR(`/v1/qa/comment/${qaId}`, async (url) =>
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
    <QaCardView
      data={issueData.data}
      commentData={commentData.data.data}
      comment={comment}
      role={role}
      mode={mode}
      email={email}
      handleComment={handleComment}
      handleAdd={handleAdd}
      deleteQa={deleteQa.trigger}
      handleClose={handleClose}
      handleEdit={handleEdit}
    />
  );
};

export default QaCard;
