// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Component Imports
import { useRecoilState, useRecoilValue } from "recoil";
import SettingContentView from "./setting-content";
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

  const { accessToken } = useRecoilValue(AuthState);
  const [team, setTeam] = useRecoilState(TeamState);

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR(`/v1/team/${team.id}`, async (url) =>
    Get<GetTeamResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      setData(res.data);
    })
  );

  //   const updateUser = useSWRMutation(
  //     "/v1/user",
  //     async (url: string) =>
  //       await Put<CommonResponse<void>>(
  //         url,
  //         {
  //           nickname: data.nickname,
  //           profile: data.profile,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${accessToken}` },
  //         }
  //       ),
  //     {
  //       onSuccess: ({ data: responseData }) => {
  //         mutate("/v1/user");
  //         setTeam((cur) => ({
  //           ...cur,
  //           profile: data.profile,
  //           name: data.name,
  //           description: data.description,
  //         }));
  //       },
  //       onError: (error) => {
  //         handleOpen({
  //           title: "Error",
  //           message: error.response.data.message,
  //           logLevel: "warn",
  //           buttonText: "Close",
  //           type: "alert",
  //         });
  //       },
  //     }
  //   );

  if (isLoading) return null;

  return <SettingContentView data={data} handleInput={handleInput} />;
};

export default SettingContent;
