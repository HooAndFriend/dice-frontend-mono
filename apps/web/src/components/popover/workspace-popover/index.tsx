"use client";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

// ** Recoil Imports
import { AuthState, TeamState, WorkspaceState } from "@/src/app";
import { useRecoilState, useRecoilValue } from "recoil";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceListResponse, WorkspaceInfo } from "@/src/type/workspace";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { accessToken } = useRecoilValue(AuthState);
  const { uuid, id } = useRecoilValue(TeamState);
  const [workspaceState, setWorkspaceState] = useRecoilState(WorkspaceState);

  const { data, error, isLoading } = useSWR("/v1/workspace/list", async (url) =>
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
      name: item.name,
      profile: item.profile,
      uuid: item.uuid,
      workspaceFunction: item.workspaceFunction,
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
