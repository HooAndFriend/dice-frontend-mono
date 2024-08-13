"use client";

// ** Component Imports
import KanbanContainer from "@/src/container/kanban-container";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";

const KanbanPage = () => {
  const {
    data,
    error,
    isLoading,
    mutate: handleTicketRefetch,
  } = useSWR("/v1/ticket", async (url) => Get<GetTicketListResponse>(url));

  if (error) return;

  return <KanbanContainer data={isLoading ? [] : data.data.data} />;
};

export default KanbanPage;
