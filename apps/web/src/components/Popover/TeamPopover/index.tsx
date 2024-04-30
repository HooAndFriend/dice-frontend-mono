"use client";

// ** React Imports
import { useState, useRef } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

// ** Recoil Imports
import { AuthState, TeamState, WorkspaceState } from "@/src/app";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// ** Type Imports
import { GetUserTeamListResponse, TeamUserInfo } from "@/src/type/team";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Get } from "@/src/repository";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [teamModalOpen, setTeamModalOpen] = useState<boolean>(false);

  const setWorkspaceState = useSetRecoilState(WorkspaceState);
  const [teamState, setTeamState] = useRecoilState(TeamState);
  const authState = useRecoilValue(AuthState);

  const cancelButtonRef = useRef(null);

  const { data, error, isLoading } = useSWR("/v1/team-user", async (url) =>
    Get<GetUserTeamListResponse>(url, {
      headers: { Authorization: `Bearer ${authState.accessToken}` },
    })
  );

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => {
    setTeamModalOpen(true);
  };

  const handleUpdateTeam = (item: TeamUserInfo) => {
    setTeamState({
      id: item.team.id,
      name: item.team.name,
      profile: item.team.profile,
      uuid: item.team.uuid,
      isPersonal: item.team.isPersonal,
      role: item.role,
    });

    setWorkspaceState({
      id: item.team.workspace[0].id,
      name: item.team.workspace[0].name,
      profile: item.team.workspace[0].profile,
      uuid: item.team.workspace[0].uuid,
      role: item.team.workspace[0].workspaceUser[0].role,
      workspaceFunction: item.team.workspace[0].workspaceFunction,
    });

    mutate("/v1/workspace-user/team");
    mutate("/v1/qa");
    mutate("/v1/epic");
    mutate("/v1/ticket");
  };

  if (isLoading) return null;

  if (error) return;

  return (
    <TeamPopoverView
      open={open}
      uuid={teamState.uuid}
      modalTeamOpen={teamModalOpen}
      cancelButtonRef={cancelButtonRef}
      setTeamModalOpen={setTeamModalOpen}
      handleModalOpen={handleModalOpen}
      handleOpen={handleOpen}
      handleUpdateTeam={handleUpdateTeam}
      data={data.data.data}
      profile={teamState.profile}
    />
  );
};

export default TeamPopover;
