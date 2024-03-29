"use client";
// ** React Imports
import { useState, KeyboardEvent } from "react";

// ** Component Imports
import QaCardView from "./QaCard";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Delete, Get, Post, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import {
  AddCommentResponse,
  GetCommentListResponse,
  GetIssueResponse,
  IssueInfo,
} from "@/src/type/qa";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  qaId: number;
  handleClose: () => void;
}

const QaCard = ({ qaId, handleClose }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [mode, setMode] = useState<"view" | "edit">("view");

  const {
    data: issueData,
    handleInput,
    setData: setIssueData,
  } = useInput<IssueInfo>({
    id: 0,
    number: "",
    status: "",
    title: "",
    admin: { email: "", nickname: "", profile: "" },
    worker: { email: "", nickname: "", profile: "" },
    file: [{ id: 0, url: "" }],
    asIs: "",
    toBe: "",
    memo: "",
    createdDate: "",
    modifiedDate: "",
  });

  const { uuid, role } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEdit = () => setMode("edit");
  const handleEditClose = () => setMode("view");

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
        commentRefetch();
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

  const deleteQaFile = useSWRMutation(
    "/v1/qa/file/",
    async (url: string, { arg }: { arg: number }) =>
      await Delete<CommonResponse<void>>(url + arg, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": `${uuid}`,
        },
      }),
    {
      onSuccess: () => {
        refetch();
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

  const updateQa = useSWRMutation(
    "v1/qa",
    async (url: string) =>
      await Put<CommonResponse<void>>(
        url,
        { ...issueData, qaId: issueData.id, workerId: 1, fileurls: [] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "workspace-code": `${uuid}`,
          },
        }
      ),
    {
      onSuccess: () => {
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
        handleEditClose();
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

  const { isLoading: issueLoading, mutate: refetch } = useSWR(
    `/v1/qa/${qaId}`,
    async (url) =>
      Get<GetIssueResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Workspace-code": `${uuid}`,
        },
      }),
    {
      onSuccess: (res) => {
        setIssueData(res.data);
      },
    }
  );

  //댓글 확인
  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
    mutate: commentRefetch,
  } = useSWR(`/v1/qa/comment/${qaId}`, async (url) =>
    Get<GetCommentListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Workspace-code": `${uuid}`,
      },
    })
  );

  const handleCommentEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addComment.trigger();
    }
  };

  if (issueLoading && commentLoading) return null;

  if (!commentData) {
    return null;
  }

  return (
    <QaCardView
      data={issueData}
      commentData={commentData.data.data}
      comment={comment}
      role={role}
      mode={mode}
      handleComment={handleComment}
      handleAdd={handleAdd}
      deleteQa={deleteQa.trigger}
      handleClose={handleClose}
      handleEdit={handleEdit}
      handleEditClose={handleEditClose}
      handleInput={handleInput}
      updateQa={updateQa.trigger}
      handleCommentEnter={handleCommentEnter}
      handleDeleteQaFile={deleteQaFile.trigger}
      refetch={refetch}
      commentRefetch={commentRefetch}
    />
  );
};

export default QaCard;
