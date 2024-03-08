"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import EpicAddItemView from "./EpicAddItem";

const EpicAddItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return <EpicAddItemView open={open} handleOpen={handleOpen} />;
};

export default EpicAddItem;
