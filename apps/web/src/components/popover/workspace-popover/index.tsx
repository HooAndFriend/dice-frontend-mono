"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import WorkspacePopoverView from "./workspace-popover";

const WorkspacePopover = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return <WorkspacePopoverView open={open} handleOpen={handleOpen} />;
};

export default WorkspacePopover;
