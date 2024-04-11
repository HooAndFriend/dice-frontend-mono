"use client";

// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Service Imports
import { Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

// ** Type Imports
import { GetIssueListResponse, QaQuery } from "@/src/type/qa";
import { EpicStatus } from "@/src/type/epic";
import { CommonResponse } from "@/src/type/common";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";
import { DropResult } from "react-beautiful-dnd";

// ** Component Imports
import QaContainerView from "./qa-container";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const QaContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [saveOpen, setSaveOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<EpicStatus>("");

  const [qaId, setQaId] = useState<number>(0);

  const [enabled, setEnabled] = useState<boolean>(false);

  const cancelButtonRef = useRef();

  const { handleOpen } = useDialog();

  const {
    data: query,
    handleInput,
    handleSelect,
  } = useInput<QaQuery>({ type: "title", value: "" });

  const handleOpenQa = (id: number) => {
    setQaId(id);
    setOpen(true);
  };

  const {
    data,
    error,
    isLoading,
    mutate: handleRqRefetch,
  } = useSWR("/v1/qa", async (url) => {
    const params = {};

    if (status !== "") {
      params["status"] = status;
    }

    if (query.value !== "") {
      params[query.type] = query.value;
    }

    return Get<GetIssueListResponse>(url, {
      params,
    });
  });

  const updateOrder = useSWRMutation(
    "/v1/qa/order",
    async (
      url: string,
      { arg }: { arg: { qaId: number; targetQaId: number } }
    ) => await Patch<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        handleRqRefetch();
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
    handleRqRefetch();
  }, [query, status]);

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
      data={data.data.data}
      count={data.data.count}
      qaId={qaId}
      query={query}
      handleSelect={handleSelect}
      handleInput={handleInput}
      setStatus={setStatus}
      handleOpenQa={handleOpenQa}
      cancelButtonRef={cancelButtonRef}
      saveOpen={saveOpen}
      setSaveOpen={setSaveOpen}
      refetch={handleRqRefetch}
      setOpen={setOpen}
      onDragEnd={onDragEnd}
    />
  );
};

export default QaContainer;
