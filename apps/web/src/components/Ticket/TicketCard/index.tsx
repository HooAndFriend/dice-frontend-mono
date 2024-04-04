// ** React Imports
import { useState } from "react";

// ** Componet imports
import TicketCardView from "./TicketCard";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// ** Type Imports
import {
  GetTicketResponse,
  TicketEditMode,
  TicketInfo,
} from "@/src/type/ticket";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

interface PropsType {
  ticketId: number;
  handleClose: () => void;
}

const TicketCard = ({ ticketId, handleClose }: PropsType) => {
  const [mode, setMode] = useState<TicketEditMode>({
    content: "view",
    storypoint: "view",
    dueDate: "view",
  });

  const { data, handleInput, setData } = useInput<TicketInfo>({
    createdDate: null,
    modifiedDate: null,
    id: 0,
    name: "",
    status: "",
    content: "",
    code: "",
    storypoint: 0,
    dueDate: null,
    completeDate: null,
    reopenDate: null,
    ticketFile: [],
    workspace: {
      id: 3,
    },
    epic: {
      id: 0,
      name: "",
    },
    admin: {
      id: 0,
      nickname: "",
      profile: "",
    },
    worker: {
      id: 0,
      nickname: "",
      profile: "",
    },
  });

  const { role } = useRecoilValue(WorkspaceState);

  const { error, isLoading } = useSWR(
    `/v1/ticket/${ticketId}`,
    async (url) => Get<GetTicketResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data);
      },
    }
  );

  if (error) return;

  if (isLoading) return;

  return (
    <TicketCardView
      data={data}
      mode={mode}
      role={role}
      onChange={handleInput}
      setData={setData}
      setMode={setMode}
      handleClose={handleClose}
    />
  );
};

export default TicketCard;
