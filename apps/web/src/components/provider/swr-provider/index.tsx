"use client";

import { SWRConfig } from "swr";

const RocoilRootProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default RocoilRootProvider;
