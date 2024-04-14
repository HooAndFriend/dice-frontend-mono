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

  const { isLoading, mutate: handleRefetch } = useSWR(
    `/v1/epic/${epicId}`,
    async (url) => Get<GetEpicDetailResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data);
      },
    }
  );

  if (isLoading) return <EpicCardSkeleton />;

  console.log(data);

  return (
    <EpicCardView
      mode={mode}
      setMode={setMode}
      role={role}
      data={data}
      onChange={handleInput}
      handleClose={handleClose}
    />
  );
};

export default EpicCard;
