import { atom } from "recoil";
import { persistAtom } from "../util";
import { RoleType } from "@/src/type/common";

interface TeamStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  role: RoleType;
}

export const teamInitState: TeamStateType = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
  role: "",
};

export const TeamState = atom<TeamStateType>({
  key: "teamState",
  default: teamInitState,
  effects_UNSTABLE: [persistAtom],
});
