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

export const WorkspaceState = atom<WorksapceStateType>({
  key: "workspaceState",
  default: {
    id: 0,
    name: "",
    profile: "",
    uuid: "",
    workspaceFunction: [],
  },
  effects_UNSTABLE: [persistAtom],
});
