// ** React Imports
import { useEffect, useState } from "react";

// ** Recoil Imports
import { atom, useRecoilState } from "recoil";
import { persistStorageAtom } from "../util";

// ** Type Imports
import { RoleType } from "@/src/type/common";

interface TeamStateType {
  id: number;
  name: string;
  profile: string;
  uuid: string;
  role: RoleType;
}

export const teamInitState: TeamStateType = {
  id: 0,
  name: "",
  profile: "",
  uuid: "",
  role: "",
};

export const TeamState = atom<TeamStateType>({
  key: "teamState",
  default: teamInitState,
  effects_UNSTABLE: [persistStorageAtom],
});

export const useTeamStateSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(TeamState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? teamInitState : value, setValue] as const;
};
