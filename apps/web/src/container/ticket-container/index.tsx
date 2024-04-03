"use client";

// ** React Imports
import { useState } from "react";
// ** Component Imports
import TicketContainerView from "./ticket-container";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";

const TicketConatiner = () => {
  const [word, setWord] = useState<string>("");
  const [ticketId, setTicketId] = useState<number>(0);

  const { data, error, isLoading } = useSWR("/v1/ticket", async (url) =>
    Get<GetTicketListResponse>(url)
  );

  if (error) return;

  if (isLoading) return;

  return (
    <TicketContainerView
      ticketId={ticketId}
      setTicketId={setTicketId}
      data={data.data.data}
      word={word}
      handleWord={(e) => setWord(e.target.value)}
    />
  );
};

export default TicketConatiner;
