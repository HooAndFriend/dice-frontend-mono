"use client";
// ** React Imports
import { useState } from "react";

// ** Component Imports
import BoardContainerView from "./board-container";

// ** Type Imports
import { OutputData } from "@editorjs/editorjs";
import { CommonResponse } from "@/src/type/common";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Put } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const BoardContainer = () => {
  const [content, setContent] = useState<OutputData>();
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const { handleOpen } = useDialog();

  const handleSave = () => {
    updateBoard.trigger();
  };

  const updateBoard = useSWRMutation(
    "/v1/board",
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        boardId: 10,
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
