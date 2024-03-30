"use client";
// ** React Imports
import { useState, KeyboardEvent, useEffect } from "react";

// ** Component Imports
import QaCardView from "./QaCard";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Delete, Get, Patch, Post, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse, QaCardEditMode } from "@/src/type/common";
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
  const [currentArg, setCurrentArg] = useState<
    "title" | "asIs" | "toBe" | "memo"
  >("title");
  const [mode, setMode] = useState<QaCardEditMode>({
    asIs: "view",
    toBe: "view",
    memo: "view",
    title: "view",
  });

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
    dueDate: null,
  });

  const { uuid, role } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
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

  //** 댓글 등록
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

  // ** Qa 삭제
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

  // ** QA File 삭제
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

  // ** QA 수정
  const updateQa = useSWRMutation(
    "v1/qa",
    async (
      url: string,
      { arg }: { arg: "title" | "asIs" | "toBe" | "memo" }
    ) => {
      setCurrentArg(arg);
      return await Patch<CommonResponse<void>>(
        url,
        { qaId, value: issueData[arg], type: arg },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "workspace-code": `${uuid}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        setMode((c) => ({ ...c, [currentArg]: "view" }));
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
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

  // ** QA 정보 조회
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

  // ** 댓글 리스트 조회
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

  useEffect(() => {
    setMode({ asIs: "view", toBe: "view", memo: "view", title: "view" });
  }, [qaId]);

  if (issueLoading && commentLoading) return;

  if (!commentData) return;

  return (
    <QaCardView
      data={issueData}
      commentData={commentData.data.data}
      comment={comment}
      role={role}
      mode={mode}
      handleComment={handleComment}
      handleAddComment={handleAddComment}
      deleteQa={deleteQa.trigger}
      handleClose={handleClose}
      handleInput={handleInput}
      handleCommentEnter={handleCommentEnter}
      handleDeleteQaFile={deleteQaFile.trigger}
      refetch={refetch}
      commentRefetch={commentRefetch}
      setMode={setMode}
      setIssueData={setIssueData}
      handleUpdateQa={updateQa.trigger}
    />
  );
};

export default QaCard;
