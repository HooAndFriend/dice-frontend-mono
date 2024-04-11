"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import TicketContainerView from "./ticket-container";

// ** Service Imports
import { Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { WorkspaceUser } from "@/src/type/workspace";

const TicketConatiner = () => {
  const [word, setWord] = useState<string>("");
  const [ticketId, setTicketId] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([]);
  const [mode, setMode] = useState<"list" | "kanban">("list");

  const [enabled, setEnabled] = useState<boolean>(false);

  const { handleOpen } = useDialog();

  const {
    data,
    error,
    isLoading,
    mutate: handleTicketRefetch,
  } = useSWR("/v1/ticket", async (url) => Get<GetTicketListResponse>(url));

  const updateOrder = useSWRMutation(
    "/v1/ticket/order",
    async (
      url: string,
      { arg }: { arg: { ticketId: number; targetTicketId: number } }
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        handleTicketRefetch();
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

  const onDragEnd = ({ source, destination }: DropResult) => {
    updateOrder.trigger({
      ticketId: source.index,
      targetTicketId: destination.index,
    });
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (isLoading || error || !enabled) return;

  return (
    <TicketContainerView
      ticketId={ticketId}
      data={data.data.data}
      ticketCount={data.data.count}
      word={word}
      mode={mode}
      checkedList={checkedList}
      handleWord={(e) => setWord(e.target.value)}
      onDragEnd={onDragEnd}
      setMode={setMode}
      setCheckedList={setCheckedList}
      setTicketId={setTicketId}
    />
  );
};

export default TicketConatiner;
