// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
import { persistStorageAtom } from "../util";

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
  effects_UNSTABLE: [persistStorageAtom],
});
