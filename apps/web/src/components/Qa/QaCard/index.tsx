"use client";
// ** React Imports
import { useState, useEffect, useRef } from "react";

// ** Component Imports
import QaCardView from "./QaCard";
import QaCardSkeletonView from "./QaCardSkeleton";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Delete, Get, Patch } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { WorkspaceState } from "@/src/app";
import { useRecoilValue } from "recoil";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse, QaCardEditMode } from "@/src/type/common";
import { GetIssueResponse, IssueInfo } from "@/src/type/qa";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  qaId: number;
  handleClose: () => void;
  refetch: () => void;
}

const QaCard = ({ qaId, handleClose, refetch: handleRefetch }: PropsType) => {
  const [selectImage, setSelectImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const [subType, setSubType] = useState<"comment" | "history">("comment");
  const [currentArg, setCurrentArg] = useState<
    "title" | "asIs" | "toBe" | "memo"
  >("title");
  const [mode, setMode] = useState<QaCardEditMode>({
    asIs: "view",
    toBe: "view",
    memo: "view",
    title: "view",
  });

  const cancelButtonRef = useRef(null);

  const {
    data: issueData,
    handleInput,
    setData: setIssueData,
  } = useInput<IssueInfo>({
    id: 0,
    code: "",
    status: "",
    title: "",
    admin: { id: 0, email: "", nickname: "", profile: "" },
    worker: { id: 0, email: "", nickname: "", profile: "" },
    qaFile: [],
    asIs: "",
    toBe: "",
    memo: "",
    createdDate: "",
    modifiedDate: "",
    dueDate: null,
  });

  const { role } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const handlePreviewOpen = (image: string) => {
    setSelectImage(image);
    setPreviewOpen(true);
  };

  // ** Qa 삭제
  const deleteQa = useSWRMutation(
    `/v1/qa/${qaId}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        handleClose();
        handleRefetch();
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

  // ** QA File 삭제
  const deleteQaFile = useSWRMutation(
    "/v1/qa/file/",
    async (url: string, { arg }: { arg: number }) =>
      await Delete<CommonResponse<void>>(url + arg),
    {
      onSuccess: () => {
        refetch();
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

  // ** QA 수정
  const updateQa = useSWRMutation(
    "v1/qa",
    async (
      url: string,
      { arg }: { arg: "title" | "asIs" | "toBe" | "memo" }
    ) => {
      setCurrentArg(arg);
      return await Patch<CommonResponse<void>>(url, {
        qaId,
        value: issueData[arg],
        type: arg,
      });
    },
    {
      onSuccess: () => {
        setMode((c) => ({ ...c, [currentArg]: "view" }));
        mutate("/v1/qa");
        mutate(`/v1/qa/${qaId}`);
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

  // ** QA 정보 조회
  const { isLoading: issueLoading, mutate: refetch } = useSWR(
    `/v1/qa/${qaId}`,
    async (url) => Get<GetIssueResponse>(url),
    {
      onSuccess: (res) => {
        setIssueData(res.data);
      },
    }
  );

  useEffect(() => {
    setMode({ asIs: "view", toBe: "view", memo: "view", title: "view" });
  }, [qaId]);

  if (issueLoading) return <QaCardSkeletonView />;

  return (
    <QaCardView
      data={issueData}
      role={role}
      mode={mode}
      selectImage={selectImage}
      previewOpen={previewOpen}
      cancelButtonRef={cancelButtonRef}
      subType={subType}
      setSubType={setSubType}
      deleteQa={deleteQa.trigger}
      handleClose={handleClose}
      handleInput={handleInput}
      handleDeleteQaFile={deleteQaFile.trigger}
      refetch={refetch}
      setMode={setMode}
      setPreviewOpen={setPreviewOpen}
      setIssueData={setIssueData}
      handleUpdateQa={updateQa.trigger}
      handlePreviewOpen={handlePreviewOpen}
    />
  );
};

export default QaCard;
