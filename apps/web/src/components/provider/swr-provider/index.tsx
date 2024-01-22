"use client";

import { SWRConfig } from "swr";

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default SwrProvider;
