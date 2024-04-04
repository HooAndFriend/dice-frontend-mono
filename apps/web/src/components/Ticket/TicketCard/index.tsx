// ** React Imports
import { KeyboardEvent, useState } from "react";

// ** Componet imports
import TicketCardView from "./TicketCard";

// ** Service Imports
import { Get, Post } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import {
  GetTicketCommentListResponse,
  GetTicketResponse,
  TicketEditMode,
  TicketInfo,
} from "@/src/type/ticket";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";
import useSWRMutation from "swr/mutation";
import { CommonResponse } from "@/src/type/common";
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  ticketId: number;
  handleClose: () => void;
}

const TicketCard = ({ ticketId, handleClose }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [mode, setMode] = useState<TicketEditMode>({
    content: "view",
    storypoint: "view",
    dueDate: "view",
  });

  const { data, handleInput, setData } = useInput<TicketInfo>({
    createdDate: null,
    modifiedDate: null,
    id: 0,
    name: "",
    status: "",
    content: "",
    code: "",
    storypoint: 0,
    dueDate: null,
    completeDate: null,
    reopenDate: null,
    ticketFile: [],
    workspace: {
      id: 3,
    },
    epic: {
      id: 0,
      name: "",
    },
    admin: {
      id: 0,
      nickname: "",
      profile: "",
    },
    worker: {
      id: 0,
      nickname: "",
      profile: "",
    },
  });

  const { role } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const {
    error,
    isLoading,
    mutate: ticketRefetch,
  } = useSWR(
    `/v1/ticket/${ticketId}`,
    async (url) => Get<GetTicketResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data);
      },
    }
  );

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
    mutate: commentRefetch,
  } = useSWR(`/v1/ticket/comment/${ticketId}`, async (url) =>
    Get<GetTicketCommentListResponse>(url)
  );

  const saveTicketComment = useSWRMutation(
    "/v1/ticket/comment",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, { content: comment, ticketId }),
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

  const handleCommentEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveTicketComment.trigger();
    }
  };

  if (error | commentError) return;

  if (isLoading || commentLoading) return;

  return (
    <TicketCardView
      data={data}
      mode={mode}
      role={role}
      comment={comment}
      commentData={commentData.data.data}
      handleComment={(e) => setComment(e.target.value)}
      onChange={handleInput}
      setData={setData}
      setMode={setMode}
      handleClose={handleClose}
      handleSaveTicketComment={saveTicketComment.trigger}
      handleCommentEnter={handleCommentEnter}
      ticketRefetch={ticketRefetch}
      commentRefetch={commentRefetch}
    />
  );
};

export default TicketCard;
