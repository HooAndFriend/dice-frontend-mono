"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import TicketAddItemView from "./TicketAddItem";

const TicketAddItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return <TicketAddItemView open={open} handleOpen={handleOpen} />;
};

export default TicketAddItem;
