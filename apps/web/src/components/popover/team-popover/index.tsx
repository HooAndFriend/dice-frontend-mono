"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return <TeamPopoverView open={open} handleOpen={handleOpen} />;
};

export default TeamPopover;
