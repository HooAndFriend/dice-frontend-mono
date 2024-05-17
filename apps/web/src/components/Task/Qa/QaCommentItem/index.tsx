"use client";
// ** React Imports
import { useState } from "react";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Delete, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Component Imports
import CommentItem from "../../Common/Comment/CommentItem";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { CommentInfo } from "@/src/type/qa";

interface PropsType {
  data: CommentInfo;
  commentRefetch: () => void;
}

const QaCommentItem = ({ data, commentRefetch }: PropsType) => {
  const [content, setContent] = useState<string>(data.content);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const { handleOpen } = useDialog();

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const deleteComment = useSWRMutation(
    `/v1/qa/comment/${data.id}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
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

  const updateComment = useSWRMutation(
    "/v1/qa/comment",
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        commentId: data.id,
        content,
      }),
    {
      onSuccess: () => {
        commentRefetch();
        setMode("view");
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

  return (
    <CommentItem
      data={data}
      mode={mode}
      comment={content}
      setMode={setMode}
      handleComment={handleComment}
      handleUpdateComment={updateComment.trigger}
      handleDeleteComment={deleteComment.trigger}
    />
  );
};

export default QaCommentItem;
