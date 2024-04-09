"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import WorkspaceModalView from "./workspace-modal";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceUserListResponse } from "@/src/type/workspace";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const WorkspaceModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { profile, name, uuid } = useRecoilValue(WorkspaceState);

  const { data, error, isLoading } = useSWR("/v1/workspace-user", async (url) =>
    Get<GetWorkspaceUserListResponse>(url)
  );

  if (isLoading) return;

  return (
    <WorkspaceModalView
      open={open}
      addOpen={addOpen}
      tab={tab}
      profile={profile}
      name={name}
      setTab={setTab}
      setAddOpen={setAddOpen}
      setOpen={setOpen}
      cancelButtonRef={cancelButtonRef}
      data={data.data.data}
    />
  );
};

export default WorkspaceModal;
