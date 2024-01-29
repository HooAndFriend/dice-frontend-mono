import { useState } from "react";
import TeamModalView from "./team-modal";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const TeamModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const [addOpen, setAddOpen] = useState<boolean>(false);

  return (
    <TeamModalView
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

export default TeamModal;
