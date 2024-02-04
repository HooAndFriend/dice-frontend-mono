import { atom } from "recoil";
import { persistAtom } from "../util";

interface AuthStateType {
  accessToken: string;
  refreshToken: string;
}

export const AuthState = atom<AuthStateType>({
  key: "authState",
  default: {
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
