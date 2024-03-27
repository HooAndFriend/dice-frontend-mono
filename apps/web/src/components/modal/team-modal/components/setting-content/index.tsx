// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Component Imports
import SettingContentView from "./setting-content";

// ** Recoil Imports
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthState, TeamState } from "@/src/app";

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

  const [teamState, setTeamState] = useRecoilState(TeamState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/team", async (url) =>
    Get<GetTeamResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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

  const handleImage = (profile: string) => {
    setData((cur) => ({ ...cur, profile }));
  };

  if (isLoading) return null;

  if (error) return;

  return (
    <SettingContentView
      data={data}
      handleInput={handleInput}
      handleUpdate={updateTeam.trigger}
      handleImage={handleImage}
    />
  );
};

export default SettingContent;
