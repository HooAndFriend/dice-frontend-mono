// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
import { persistStorageAtom } from "../util";

// ** Type Imports
import { WorksapceFunction } from "@/src/type/workspace";
import { RoleType } from "@/src/type/common";

interface WorksapceStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  role: RoleType;
  workspaceFunction: WorksapceFunction[];
}

export const workspaceInitState: WorksapceStateType = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
  role: "",
  workspaceFunction: [],
};

export const WorkspaceState = atom<WorksapceStateType>({
  key: "workspaceState",
  default: workspaceInitState,
  effects_UNSTABLE: [persistStorageAtom],
});
