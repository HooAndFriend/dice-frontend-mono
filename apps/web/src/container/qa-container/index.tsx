"use client";

// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Service Imports
import { Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Type Imports
import { GetIssueListResponse } from "@/src/type/qa";
import { EpicStatus } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Utils Imports
import { DropResult } from "react-beautiful-dnd";

// ** Component Imports
import QaContainerView from "./qa-container";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { WorkspaceUser } from "@/src/type/workspace";
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [saveOpen, setSaveOpen] = useState<boolean>(false);

  const [word, setWord] = useState<string>("");

  const [status, setStatus] = useState<EpicStatus>("");

  const [qaId, setQaId] = useState<number>(0);

  const [checkedList, setCheckedList] = useState<WorkspaceUser[]>([]);

  const [enabled, setEnabled] = useState<boolean>(false);

  const cancelButtonRef = useRef();

  const { role } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const handleOpenQa = (id: number) => {
    setQaId(id);
    setOpen(true);
  };

  const {
    data,
    error,
    isLoading,
    mutate: handleQaRefetch,
  } = useSWR("/v1/qa", async (url) => {
    return Get<GetIssueListResponse>(url);
  });

  const updateOrder = useSWRMutation(
    "/v1/qa/order",
    async (
      url: string,
      { arg }: { arg: { qaId: number; targetQaId: number } }
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        handleQaRefetch();
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
      qaId: source.index,
      targetQaId: destination.index,
    });
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (isLoading || error || !enabled) return null;

  return (
    <QaContainerView
      open={open}
      status={status}
      data={data.data.data
        .filter((item) => item.title.includes(word))
        .filter((item) => (status === "" ? true : item.status === status))
        .filter((item) =>
          checkedList.length === 0
            ? true
            : checkedList.some((_) => _.teamUser.user.id === item.worker?.id)
        )}
      qaId={qaId}
      word={word}
      role={role}
      checkedList={checkedList}
      setWord={setWord}
      setStatus={setStatus}
      setCheckedList={setCheckedList}
      handleOpenQa={handleOpenQa}
      cancelButtonRef={cancelButtonRef}
      saveOpen={saveOpen}
      setSaveOpen={setSaveOpen}
      refetch={handleQaRefetch}
      setOpen={setOpen}
      onDragEnd={onDragEnd}
    />
  );
};

export default QaContainer;
