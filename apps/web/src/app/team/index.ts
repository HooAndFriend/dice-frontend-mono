// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
import { persistStorageAtom } from "../util";

// ** Type Imports
import { RoleType } from "@/src/type/common";

export interface TeamStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  isPersonal: boolean;
  role: RoleType;
}

export const teamInitState: TeamStateType = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
  isPersonal: true,
  role: "",
};

export const TeamState = atom<TeamStateType>({
  key: "teamState",
  default: teamInitState,
  effects_UNSTABLE: [persistStorageAtom],
});
