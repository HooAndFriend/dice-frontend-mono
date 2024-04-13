"use client";

// ** React Imports
import { useRef, useState } from "react";

// ** Component Imports
import UserPopoverView from "./user-popover";

const UserPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleModalOpen = () => setModalOpen(true);

  return (
    <UserPopoverView
      open={open}
      handleOpen={handleOpen}
      modalOpen={modalOpen}
      cancelButtonRef={cancelButtonRef}
      setModalOpen={setModalOpen}
      handleModalOpen={handleModalOpen}
    />
  );
};

export default UserPopover;
