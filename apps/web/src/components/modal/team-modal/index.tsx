import { useState } from "react";
import TeamModalView from "./team-modal";
import { DialogProvider } from "@/src/context/DialogContext";
import { useRecoilValue } from "recoil";
import { TeamState } from "@/src/app";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const TeamModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const { name, profile } = useRecoilValue(TeamState);

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
        name={name}
        profile={profile}
      />
    </DialogProvider>
  );
};

export default TeamModal;
