"use client";

// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

// ** Recoil Imports
import { AuthState, TeamState, UserState, WorkspaceState } from "@/src/app";
import { useRecoilState, useRecoilValue } from "recoil";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceListResponse, WorkspaceInfo } from "@/src/type/workspace";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [workspaceState, setWorkspaceState] = useRecoilState(WorkspaceState);
  const { id, uuid, name } = useRecoilValue(TeamState);
  const { accessToken } = useRecoilValue(AuthState);

  const { data, error, isLoading, mutate } = useSWR(
    "/v1/workspace-user/team",
    async (url) =>
      Get<GetWorkspaceListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "team-code": id === 0 ? "personal" : uuid,
        },
      })
  );

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  const handleUpdateWorkspace = (item: WorkspaceInfo) => {
    setWorkspaceState({
      id: item.id,
      name: item.workspace.name,
      profile: item.workspace.profile,
      uuid: item.workspace.uuid,
      workspaceFunction: item.workspace.workspaceFunction,
      role: item.role,
    });
  };

  useEffect(() => {
    mutate();
  }, [id]);

  if (isLoading) return;

  if (error) return;

  return (
    <WorkspacePopoverView
      open={open}
      id={workspaceState.id}
      data={data.data.data}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
      handleUpdateWorkspace={handleUpdateWorkspace}
      workspace={workspaceState}
      profile={workspaceState.profile}
    />
  );
};

export default WorkspacePopover;
