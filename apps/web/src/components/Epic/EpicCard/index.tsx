// ** React Imports

// ** Componet imports
import EpicCardView from "./EpicCard";

// ** Service Imports
import { Delete, Get, Patch, Post } from "@/src/repository";
import useSWR, { mutate } from "swr";

// ** Type Imports
import { GetTicketResponse } from "@/src/type/ticket";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";
import {
  EpicDetail,
  EpicEditMode,
  GetEpicDetailResponse,
} from "@/src/type/epic";
import { useState } from "react";
import EpicCardSkeleton from "./EpicCardSkeleton";
import useSWRMutation from "swr/mutation";
import { CommonResponse } from "@/src/type/common";
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  epicId: number;
  handleClose: () => void;
}

const EpicCard = ({ epicId, handleClose }: PropsType) => {
  const [mode, setMode] = useState<EpicEditMode>({
    name: "view",
    content: "view",
  });

  const { data, setData, handleInput } = useInput<EpicDetail>({
    id: 0,
    name: "",
    code: "",
    dueDate: null,
    ticket: [],
    admin: null,
  });

  const { role } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const { isLoading, mutate: handleRefetch } = useSWR(
    `/v1/epic/${epicId}`,
    async (url) => Get<GetEpicDetailResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data);
      },
    }
  );

  const updateEpic = useSWRMutation(
    "/v1/epic",
    async (url: string) => {
      return await Patch<CommonResponse<void>>(url, {
        epicId,
        name: data.name,
      });
    },
    {
      onSuccess: () => {
        setMode({ ...mode, name: "view" });
        mutate("/v1/epic");
        mutate(`/v1/epic/${epicId}`);
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

  const deleteEpic = useSWRMutation(
    "/v1/epic/",
    async (url: string) => {
      return await Delete<CommonResponse<void>>(url + epicId);
    },
    {
      onSuccess: () => {
        mutate("/v1/epic");
        handleClose();
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

  if (isLoading) return <EpicCardSkeleton />;

  return (
    <EpicCardView
      mode={mode}
      setMode={setMode}
      role={role}
      data={data}
      onChange={handleInput}
      handleClose={handleClose}
      handleUpdateName={updateEpic.trigger}
      handleDeleteEpic={deleteEpic.trigger}
    />
  );
};

export default EpicCard;
