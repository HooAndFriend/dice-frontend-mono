// ** React Imports
import { useState } from "react";

// ** Component Imports
import TeamModalView from "./team-modal";

// ** Context Imports
import { DialogProvider } from "@/src/context/DialogContext";

// ** Recoil Imports
import { useTeamStateSSR } from "@/src/app";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const TeamModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const [teamState, setTeamState] = useTeamStateSSR();

  const [addOpen, setAddOpen] = useState<boolean>(false);

  return (
    <DialogProvider>
      <TeamModalView
        open={open}
        addOpen={addOpen}
        tab={tab}
        setTab={setTab}
        setAddOpen={setAddOpen}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        name={teamState.name}
        profile={teamState.profile}
      />
    </DialogProvider>
  );
};

export default TeamModal;
