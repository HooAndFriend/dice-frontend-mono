import { atom } from "recoil";

interface AuthStateType {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export const AuthState = atom<AuthStateType>({
  key: "authState",
  default: {
    accessToken: "",
    refreshToken: "",
    username: "",
  },
});
