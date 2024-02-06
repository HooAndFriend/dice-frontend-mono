import { WorksapceFunction } from "@/src/type/workspace";
import { atom } from "recoil";
import { persistAtom } from "../util";

interface WorksapceStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  workspaceFunction: WorksapceFunction[];
}

export const workspaceInitState = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
  workspaceFunction: [],
};

export const WorkspaceState = atom<WorksapceStateType>({
  key: "workspaceState",
  default: workspaceInitState,
  effects_UNSTABLE: [persistAtom],
});
