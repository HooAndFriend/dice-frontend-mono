"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { useState, useRef } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

// ** Recoil Imports
import {
  authInitState,
  teamInitState,
  useAuthStateSSR,
  useTeamStateSSR,
  useUserStateSSR,
  useWorkspaceStateSSR,
  userInitState,
  workspaceInitState,
} from "@/src/app";

// ** Type Imports
import { GetUserTeamListResponse, TeamUserInfo } from "@/src/type/team";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [teamModalOpen, setTeamModalOpen] = useState<boolean>(false);
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const [userState, setUserState] = useUserStateSSR();
  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();
  const [teamState, setTeamState] = useTeamStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const cancelButtonRef = useRef(null);

  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url, {
      headers: { Authorization: `Bearer ${authState.accessToken}` },
    })
  );

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => {
    if (teamState.id === 0) {
      setUserModalOpen(true);

      return;
    }

    setTeamModalOpen(true);
  };

  const handleUpdateTeam = (item: TeamUserInfo | 0) => {
    if (item === 0) {
      setTeamState(teamInitState);
      return;
    }

    setTeamState({
      id: item.team.id,
      name: item.team.name,
      profile: item.team.profile,
      uuid: item.team.uuid,
      role: item.role,
    });
  };

  const handleLogout = () => {
    setAuthState(authInitState);
    setUserState(userInitState);
    setWorkspaceState(workspaceInitState);

    router.push("/");
  };

  if (isLoading) return null;

  if (error) return;

  return (
    <TeamPopoverView
      open={open}
      teamName={teamState.name}
      id={teamState.id}
      user={userState}
      userModalOpen={userModalOpen}
      modalTeamOpen={teamModalOpen}
      cancelButtonRef={cancelButtonRef}
      setTeamModalOpen={setTeamModalOpen}
      setUserModalOpen={setUserModalOpen}
      handleModalOpen={handleModalOpen}
      handleOpen={handleOpen}
      handleUpdateTeam={handleUpdateTeam}
      handleLogout={handleLogout}
      data={data.data.data}
    />
  );
};

export default TeamPopover;
