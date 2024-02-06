import { atom } from "recoil";
import { persistAtom } from "../util";

interface UserStateType {
  email: string;
  nickname: string;
  profile: string;
}

export const userInitState = {
  email: "",
  nickname: "",
  profile: "",
};

export const UserState = atom<UserStateType>({
  key: "userState",
  default: userInitState,
  effects_UNSTABLE: [persistAtom],
});
