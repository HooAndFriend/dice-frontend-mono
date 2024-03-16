// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
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

export const useAuthStateSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(AuthState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? authInitState : value, setValue] as const;
};
