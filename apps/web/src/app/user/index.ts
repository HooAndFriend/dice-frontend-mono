import { atom } from "recoil";

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
});
