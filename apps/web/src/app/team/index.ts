import { atom } from "recoil";
import { persistAtom } from "../util";

interface TeamStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
}

export const teamInitState = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
};

export const TeamState = atom<TeamStateType>({
  key: "teamState",
  default: teamInitState,
  effects_UNSTABLE: [persistAtom],
});
