"use client";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  return (
    <WorkspacePopoverView
      open={open}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
    />
  );
};

export default WorkspacePopover;
