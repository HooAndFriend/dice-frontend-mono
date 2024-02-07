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

// ** Type Imports
import { GetUserTeamListResponse } from "@/src/type/team";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [teamModalOpen, setTeamModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  const { id } = useRecoilValue(TeamState);

  const router = useRouter();

  const { accessToken } = useRecoilValue(AuthState);
  const setAuthState = useSetRecoilState(AuthState);
  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);

  const cancelButtonRef = useRef(null);

  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  );

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

  if (isLoading) return null;

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
      data={data.data.data}
    />
  );
};

export default TeamPopover;
