"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import UserPopoverView from "./user-popover";

// ** Recoil Imports
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AuthState,
  TeamState,
  UserState,
  WorkspaceState,
  authInitState,
  teamInitState,
  userInitState,
  workspaceInitState,
} from "@/src/app";

const UserPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  const router = useRouter();

  const [userState, setUserState] = useRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);
  const setAuthState = useSetRecoilState(AuthState);
  const setTeamState = useSetRecoilState(TeamState);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  const handleLogout = () => {
    setAuthState(authInitState);
    setUserState(userInitState);
    setWorkspaceState(workspaceInitState);
    setTeamState(teamInitState);

    router.push("/");
  };

  return (
    <UserPopoverView
      open={open}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      userState={userState}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
      handleLogout={handleLogout}
    />
  );
};

export default UserPopover;
