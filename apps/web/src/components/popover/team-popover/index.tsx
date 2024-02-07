"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useState, useRef } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

// ** Recoil Imports
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  AuthState,
  TeamState,
  UserState,
  WorkspaceState,
  authInitState,
  userInitState,
  workspaceInitState,
} from "@/src/app";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [teamModalOpen, setTeamModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  const { id } = useRecoilValue(TeamState);

  const router = useRouter();

  const setAuthState = useSetRecoilState(AuthState);
  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => {
    if (id === 0) {
      setUserModalOpen(true);

      return;
    }

    setTeamModalOpen(true);
  };

  const handleLogout = () => {
    setAuthState(authInitState);
    setUserState(userInitState);
    setWorkspaceState(workspaceInitState);

    router.push("/");
  };

  return (
    <TeamPopoverView
      open={open}
      userModalOpen={userModalOpen}
      modalTeamOpen={teamModalOpen}
      cancelButtonRef={cancelButtonRef}
      setTeamModalOpen={setTeamModalOpen}
      setUserModalOpen={setUserModalOpen}
      handleModalOpen={handleModalOpen}
      handleOpen={handleOpen}
      handleLogout={handleLogout}
    />
  );
};

export default TeamPopover;
