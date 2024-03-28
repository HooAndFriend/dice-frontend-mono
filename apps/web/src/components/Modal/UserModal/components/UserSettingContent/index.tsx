// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Recoil Imports
import { AuthState, UserState } from "@/src/app";

// ** Component Imports
import { ImageUploader } from "@/src/components/ImageUploader";
import { GetUserInfoResponse, UserInfo } from "@/src/type/user";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";
import { useRecoilValue, useSetRecoilState } from "recoil";

const UserSettingContent = () => {
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
    <div>
      <label className="text-xl font-bold font-spoqa">Profile</label>
      <ImageUploader mode="edit" image={data.profile} setPath={handleImage} />
      <div className="mt-5">
        <label className="text-base font-bold font-spoqa">Nickname</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.nickname}
          name="nickname"
          onChange={handleInput}
        />
      </div>
      <div className="mt-5">
        <label className="text-base font-bold font-spoqa">Email</label>
        <input
          id="email"
          placeholder="Enter Your Email"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.email}
          name="email"
          onChange={handleInput}
        />
      </div>
      <button
        className="m-auto mt-[93px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg"
        onClick={updateUser.trigger}
      >
        Update
      </button>
    </div>
  );
};

export default UserSettingContent;
