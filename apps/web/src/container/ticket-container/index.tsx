"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import TicketContainerView from "./ticket-container";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";

const TicketConatiner = () => {
  const [word, setWord] = useState<string>("");
  const [ticketId, setTicketId] = useState<number>(0);
  const [mode, setMode] = useState<"list" | "kanban">("list");

  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR("/v1/ticket", async (url) =>
    Get<GetTicketListResponse>(url)
  );

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(">>> source", source);
    console.log(">>> destination", destination);
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
      handleWord={(e) => setWord(e.target.value)}
      onDragEnd={onDragEnd}
      setMode={setMode}
      setTicketId={setTicketId}
    />
  );
};

export default TicketConatiner;
