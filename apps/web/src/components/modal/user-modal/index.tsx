// ** React Imports
import { useState } from "react";

// ** Component Imports
import UserModalView from "./user-modal";

// ** Context Imports
import { DialogProvider } from "@/src/context/DialogContext";

// ** Recoil Imports
import { UserState } from "@/src/app";
import { useRecoilValue } from "recoil";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const UserModal = ({ open, setOpen, cancelButtonRef }: PropsType) => {
  const [tab, setTab] = useState<number>(0);

  const { profile, nickname } = useRecoilValue(UserState);

  return (
    <DialogProvider>
      <UserModalView
        open={open}
        tab={tab}
        setTab={setTab}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        profile={profile}
        nickname={nickname}
      />
    </DialogProvider>
  );
};

export default UserModal;
