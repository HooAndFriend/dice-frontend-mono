"use client";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

// ** Recoil Imports
import {
  useAuthStateSSR,
  useTeamStateSSR,
  useWorkspaceStateSSR,
} from "@/src/app";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceListResponse, WorkspaceInfo } from "@/src/type/workspace";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();
  const [teamState, setTeamState] = useTeamStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { data, error, isLoading } = useSWR(
    "/v1/workspace-user/team",
    async (url) =>
      Get<GetWorkspaceListResponse>(url, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
          "team-code": teamState.id === 0 ? "personal" : teamState.uuid,
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

  if (isLoading) return;

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
    />
  );
};

export default WorkspacePopover;
