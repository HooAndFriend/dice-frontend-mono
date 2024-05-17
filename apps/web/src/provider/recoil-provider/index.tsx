"use client";

import { RecoilRoot } from "recoil";

const RocoilRootProvider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RocoilRootProvider;
