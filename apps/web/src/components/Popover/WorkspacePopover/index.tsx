"use client";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

// ** Recoil Imports
import { WorkspaceState } from "@/src/app";
import { useRecoilState } from "recoil";

// ** Service Imports
import useSWR, { mutate } from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceListResponse, WorkspaceInfo } from "@/src/type/workspace";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [workspaceState, setWorkspaceState] = useRecoilState(WorkspaceState);

  const {
    data,
    error,
    isLoading,
    mutate: handleRefetch,
  } = useSWR("/v1/workspace-user/workspace", async (url) =>
    Get<GetWorkspaceListResponse>(url)
  );

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  const handleUpdateWorkspace = (item: WorkspaceInfo) => {
    setWorkspaceState({
      workspaceId: item.workspaceUserId,
      name: item.workspace.name,
      profile: item.workspace.profile,
      uuid: item.workspace.uuid,
      workspaceFunction: item.workspace.workspaceFunction,
      role: item.role,
    });

    mutate("/v1/qa");
  };

  if (isLoading) return;

  if (error) return;

  return (
    <WorkspacePopoverView
      open={open}
      data={data.data.data}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
      handleUpdateWorkspace={handleUpdateWorkspace}
      workspace={workspaceState}
    />
  );
};

export default WorkspacePopover;
