"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import TableContainer from "@/src/container/table-container";

// ** Service Imports
import { Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Type Imports
import { GetTicketListResponse } from "@/src/type/ticket";
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { WorkspaceUser } from "@/src/type/workspace";
import { EpicStatus } from "@/src/type/epic";

const TablePage = () => {
  const [word, setWord] = useState<string>("");
  const [selectedEpicIds, setSelectedEpicIds] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EpicStatus[]>([]);
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);

  const [ticketId, setTicketId] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([]);

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

  const handleEpicSelectFilter = (epicId: number) => {
    if (selectedEpicIds.includes(epicId)) {
      setSelectedEpicIds((c) => c.filter((id) => id !== epicId));
    } else {
      setSelectedEpicIds((c) => [...c, epicId]);
    }
  };

  const handleStatusSelectFilter = (status: EpicStatus) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus((c) => c.filter((s) => s !== status));
    } else {
      setSelectedStatus((c) => [...c, status]);
    }
  };

  const handleTypeSelectFilter = (typeId: number) => {
    if (selectedTypeIds.includes(typeId)) {
      setSelectedTypeIds((c) => c.filter((id) => id !== typeId));
    } else {
      setSelectedTypeIds((c) => [...c, typeId]);
    }
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (error || !enabled) return;

  return (
    <TableContainer
      ticketId={ticketId}
      selectedStatus={selectedStatus}
      selectedTypeIds={selectedTypeIds}
      selectedEpicIds={selectedEpicIds}
      data={isLoading ? [] : data.data.data}
      ticketCount={isLoading ? 0 : data.data.count}
      word={word}
      checkedList={checkedList}
      handleTypeSelectFilter={handleTypeSelectFilter}
      handleStatusSelectFilter={handleStatusSelectFilter}
      handleEpicSelectFilter={handleEpicSelectFilter}
      updateOrder={updateOrder.trigger}
      handleWord={(e) => setWord(e.target.value)}
      setCheckedList={setCheckedList}
      setTicketId={setTicketId}
      isLoading={isLoading}
    />
  );
};

export default TablePage;
