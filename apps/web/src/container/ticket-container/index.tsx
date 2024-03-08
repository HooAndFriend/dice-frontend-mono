"use client";

import { useState } from "react";
// ** Component Imports
import TicketContainerView from "./ticket-container";

const TicketConatiner = () => {
  const [ticketId, setTicketId] = useState<number>(0);

  return <TicketContainerView ticketId={ticketId} setTicketId={setTicketId} />;
};

export default TicketConatiner;
