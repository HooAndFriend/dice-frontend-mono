"use client";

// ** Component Imports
import KanbanContainerView from "./kanban-container";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";

const KanbanContainer = () => {
  const {
    data,
    error,
    isLoading,
    mutate: handleTicketRefetch,
  } = useSWR("/v1/ticket", async (url) => Get<GetTicketListResponse>(url));

  if (error) return;

  return <KanbanContainerView data={isLoading ? [] : data.data.data} />;
};

export default KanbanContainer;
