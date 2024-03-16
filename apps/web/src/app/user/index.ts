// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
import { persistStorageAtom } from "../util";

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
  effects_UNSTABLE: [persistStorageAtom],
});

export const useUserStateSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(UserState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? userInitState : value, setValue] as const;
};
