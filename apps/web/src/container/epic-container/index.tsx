"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import EpicContainerView from "./epic-container";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import { GetEpicListResponse } from "@/src/type/epic";

const EpicConatiner = () => {
  const [word, setWord] = useState<string>("");
  const [ticketId, setTicketId] = useState<number>(0);
  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR("/v1/epic", async (url) =>
    Get<GetEpicListResponse>(url)
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
    <EpicContainerView
      epicData={data.data.data}
      epicCount={data.data.count}
      word={word}
      ticketId={ticketId}
      setTicketId={setTicketId}
      handleWord={(e) => setWord(e.target.value)}
      onDragEnd={onDragEnd}
    />
  );
};

export default EpicConatiner;
