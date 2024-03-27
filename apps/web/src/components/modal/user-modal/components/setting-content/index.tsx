// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, UserState } from "@/src/app";

// ** Component Imports
import SettingContentView from "./setting-content";
import { GetUserInfoResponse, UserInfo } from "@/src/type/user";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SettingContent = () => {
  const { data, setData, handleInput } = useInput<UserInfo>({
    email: "",
    nickname: "",
    profile: "",
  });

  const setUserState = useSetRecoilState(UserState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/user", async (url) =>
    Get<GetUserInfoResponse>(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      setData(res.data);
    })
  );

  const updateUser = useSWRMutation(
    "/v1/user",
    async (url: string) =>
      await Put<CommonResponse<void>>(
        url,
        {
          nickname: data.nickname,
          profile: data.profile,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ),
    {
      onSuccess: ({ data: responseData }) => {
        mutate("/v1/user");
        setUserState((cur) => ({
          ...cur,
          profile: data.profile,
          nickname: data.nickname,
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

  return (
    <SettingContentView
      data={data}
      handleInput={handleInput}
      handleUpdate={updateUser.trigger}
      handleImage={handleImage}
    />
  );
};

export default SettingContent;
