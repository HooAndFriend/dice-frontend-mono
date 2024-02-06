"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useState, useRef } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

// ** Recoil Imports
import { useSetRecoilState } from "recoil";
import {
  AuthState,
  UserState,
  WorkspaceState,
  authInitState,
  userInitState,
  workspaceInitState,
} from "@/src/app";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const setAuthState = useSetRecoilState(AuthState);
  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  const handleLogout = () => {
    setAuthState(authInitState);
    setUserState(userInitState);
    setWorkspaceState(workspaceInitState);

    router.push("/");
  };

  return (
    <TeamPopoverView
      open={open}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
      handleLogout={handleLogout}
    />
  );
};

export default TeamPopover;
