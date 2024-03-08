"use client";

// ** Component Imports
import { useState } from "react";
import EpicItemView from "./EpicItem";

const EpicItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return <EpicItemView open={open} handleOpen={handleOpen} />;
};

export default EpicItem;
