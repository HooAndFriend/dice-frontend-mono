"use client";

import { useState } from "react";
import WorkspaceModalView from "./workspace-modal";
import { useRecoilValue } from "recoil";
import { WorkspaceState } from "@/src/app";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const WorkspaceModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { profile, name } = useRecoilValue(WorkspaceState);

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
    />
  );
};

export default WorkspaceModal;
