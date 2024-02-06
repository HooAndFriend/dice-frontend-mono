import { atom } from "recoil";
import { persistAtom } from "../util";

interface AuthStateType {
  accessToken: string;
  refreshToken: string;
}

export const authInitState = {
  accessToken: "",
  refreshToken: "",
};

export const AuthState = atom<AuthStateType>({
  key: "authState",
  default: authInitState,
  effects_UNSTABLE: [persistAtom],
});
