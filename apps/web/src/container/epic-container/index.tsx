"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Component Imports
import EpicContainerView from "./epic-container";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Type Imports
import {
  EpicStatus,
  GetEpicListResponse,
  SelectContent,
} from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { WorkspaceUser } from "@/src/type/workspace";

const EpicConatiner = () => {
  const [word, setWord] = useState<string>("");
  const [selectContent, setSelectContent] = useState<SelectContent>({
    id: 0,
    type: "EPIC",
  });
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EpicStatus[]>([]);
  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([]);

  const [enabled, setEnabled] = useState<boolean>(false);

  const { handleOpen } = useDialog();

  const { data, error, isLoading } = useSWR("/v1/epic", async (url) =>
    Get<GetEpicListResponse>(url)
  );

  const updateEpicOrder = useSWRMutation(
    "/v1/epic/order",
    async (
      url: string,
      { arg }: { arg: { epicId: number; targetEpicId: number } }
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        mutate("/v1/epic");
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

  const handleTypeSelectFilter = (id: number) => {
    if (selectedTypeIds.includes(id)) {
      setSelectedTypeIds((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedTypeIds((prev) => [...prev, id]);
    }
  };

  const handleStatusSelectFilter = (status: EpicStatus) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus((prev) => prev.filter((v) => v !== status));
    } else {
      setSelectedStatus((prev) => [...prev, status]);
    }
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    updateEpicOrder.trigger({
      epicId: source.index,
      targetEpicId: destination.index,
    });
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
    <EpicContainerView
      epicData={isLoading ? [] : data.data.data}
      epicCount={isLoading ? 0 : data.data.count}
      word={word}
      checkedList={checkedList}
      selectedTypeIds={selectedTypeIds}
      selectedStatus={selectedStatus}
      selectContent={selectContent}
      setSelectContent={setSelectContent}
      handleStatusSelectFilter={handleStatusSelectFilter}
      handleTypeSelectFilter={handleTypeSelectFilter}
      handleWord={(e) => setWord(e.target.value)}
      setCheckedList={setCheckedList}
      onDragEnd={onDragEnd}
      isLoading={isLoading}
    />
  );
};

export default EpicConatiner;
