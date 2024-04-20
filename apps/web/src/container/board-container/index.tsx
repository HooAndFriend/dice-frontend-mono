"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import BoardContainerView from "./board-container";

// ** Type Imports
import { OutputData } from "@editorjs/editorjs";
import { CommonResponse } from "@/src/type/common";
import { BoardDetail, GetBoardResponse } from "@/src/type/board";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Delete, Get, Put } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import useSWR, { mutate } from "swr";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

const BoardContainer = () => {
  const {
    data: board,
    handleInput,
    setData: setBoard,
  } = useInput<BoardDetail>({
    content: "",
    title: "",
    createdDate: null,
    createdId: "",
    id: 0,
    isDeleted: false,
    modifiedDate: null,
    modifiedId: "",
    orderId: 0,
    children: [],
    parent: null,
  });
  const [content, setContent] = useState<OutputData>();
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const { get } = useSearchParams();
  const router = useRouter();

  const { handleOpen } = useDialog();

  const handleSave = () => {
    updateBoard.trigger();
  };

  const { mutate: boardRefetch } = useSWR(
    `/v1/board/${get("boardId")}`,
    async (url) => {
      if (!get("boardId")) return;
      return Get<GetBoardResponse>(url);
    },
    {
      onSuccess: ({ data }) => {
        setBoard(data);
        setContent(JSON.parse(data.content));
      },
    }
  );

  const updateBoard = useSWRMutation(
    "/v1/board",
    async (url: string) => {
      return await Put<CommonResponse<void>>(url, {
        boardId: Number(get("boardId")),
        title: board.title,
        content: JSON.stringify(content),
      });
    },
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

  const deleteBoard = useSWRMutation(
    "/v1/board/",
    async (url: string) =>
      await Delete<CommonResponse<void>>(url + get("boardId")),
    {
      onSuccess: ({ data }) => {
        router.push("/dashboard/board");
        mutate("/v1/board");
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

  useEffect(() => {
    setReadOnly(true);
  }, [get("boardId")]);

  if (!get("boardId") || !board) return null;

  return (
    <BoardContainerView
      content={content}
      readOnly={readOnly}
      board={board}
      handleInput={handleInput}
      setReadOnly={setReadOnly}
      setContent={setContent}
      handleSave={handleSave}
      handleDelete={deleteBoard.trigger}
    />
  );
};

export default BoardContainer;
