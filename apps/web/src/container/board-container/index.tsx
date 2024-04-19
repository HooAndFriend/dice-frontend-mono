"use client";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import BoardContainerView from "./board-container";

// ** Type Imports
import { OutputData } from "@editorjs/editorjs";
import { CommonResponse } from "@/src/type/common";
import { GetBoardResponse } from "@/src/type/board";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Get, Put } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import useSWR from "swr";

const BoardContainer = () => {
  const [content, setContent] = useState<OutputData>();
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const { get } = useSearchParams();

  const { handleOpen } = useDialog();

  const handleSave = () => {
    updateBoard.trigger();
  };

  const { mutate } = useSWR(
    `/v1/board/${get("boardId")}`,
    async (url) => {
      return Get<GetBoardResponse>(url);
    },
    {
      onSuccess: ({ data }) => {
        setContent(JSON.parse(data.content));
      },
    }
  );

  const updateBoard = useSWRMutation(
    "/v1/board",
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        boardId: Number(get("boardId")),
        title: "Hello",
        content: JSON.stringify(content),
      }),
    {
      onSuccess: ({ data }) => {
        setReadOnly(true);
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
    <BoardContainerView
      content={content}
      readOnly={readOnly}
      setReadOnly={setReadOnly}
      setContent={setContent}
      handleSave={handleSave}
    />
  );
};

export default BoardContainer;
