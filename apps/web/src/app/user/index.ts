import { atom } from "recoil";
import { persistAtom } from "../util";

interface UserStateType {
  email: string;
  nickname: string;
  profile: string;
}

export const UserState = atom<UserStateType>({
  key: "userState",
  default: {
    email: "",
    nickname: "",
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});
