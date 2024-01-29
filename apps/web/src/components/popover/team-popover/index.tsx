"use client";

// ** React Imports
import { useState, useRef } from "react";

// ** Component Imports
import TeamPopoverView from "./team-popover";

const TeamPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  return (
    <TeamPopoverView
      open={open}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
    />
  );
};

export default TeamPopover;
