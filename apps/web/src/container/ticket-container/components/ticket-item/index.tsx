// ** Component Imports
import { useState } from "react";
import TicketItemView from "./ticket-item";

const TicketItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  return <TicketItemView open={open} handleOpen={handleOpen} />;
};

export default TicketItem;
