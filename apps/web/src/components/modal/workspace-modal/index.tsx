import { useState } from "react";
import WorkspaceModalView from "./workspace-modal";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const WorkspaceModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const [addOpen, setAddOpen] = useState<boolean>(false);

  return (
    <WorkspaceModalView
      open={open}
      addOpen={addOpen}
      tab={tab}
      setTab={setTab}
      setAddOpen={setAddOpen}
      setOpen={setOpen}
      cancelButtonRef={cancelButtonRef}
    />
  );
};

export default WorkspaceModal;
