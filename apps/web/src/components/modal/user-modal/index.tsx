// ** React Imports
import { useState } from "react";

// ** Component Imports
import UserModalView from "./user-modal";
import { DialogProvider } from "@/src/context/DialogContext";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const UserModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <DialogProvider>
      <UserModalView
        open={open}
        tab={tab}
        setTab={setTab}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  );
};

export default UserModal;
