// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Component Imports
import SettingContentView from "./setting-content";

// ** Recoil Imports
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AuthState,
  TeamState,
  useAuthStateSSR,
  useTeamStateSSR,
} from "@/src/app";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { GetTeamResponse, TeamInfo } from "@/src/type/team";
import { CommonResponse } from "@/src/type/common";

const SettingContent = () => {
  const { data, setData, handleInput } = useInput<TeamInfo>({
    id: 0,
    name: "",
    profile: "",
    uuid: "",
    description: "",
  });

  const [teamState, setTeamState] = useTeamStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/team", async (url) =>
    Get<GetTeamResponse>(url, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "team-code": teamState.uuid,
      },
    }).then((res) => {
      setData(res.data);
    })
  );

  const updateTeam = useSWRMutation(
    "/v1/team",
    async (url: string) =>
      await Put<CommonResponse<void>>(
        url,
        {
          name: data.name,
          description: data.description,
          profile: data.profile,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
            "team-code": teamState.uuid,
          },
        }
      ),
    {
      onSuccess: () => {
        mutate("/v1/team");
        setTeamState((cur) => ({
          ...cur,
          profile: data.profile,
          name: data.name,
          description: data.description,
        }));
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  if (isLoading) return null;

  return (
    <SettingContentView
      data={data}
      handleInput={handleInput}
      handleUpdate={updateTeam.trigger}
    />
  );
};

export default SettingContent;
