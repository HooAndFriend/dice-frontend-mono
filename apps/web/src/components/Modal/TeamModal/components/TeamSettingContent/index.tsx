// ** Swr Imports
import useSWR, { mutate } from "swr";
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Component Imports
import { ImageUploader } from "@/src/components/ImageUploader";

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

const TeamSettingContent = () => {
  const { data, setData, handleInput } = useInput<TeamInfo>({
    id: 0,
    name: "",
    profile: "",
    uuid: "",
    description: "",
  });

  const [teamState, setTeamState] = useRecoilState(TeamState);

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/team", async (url) =>
    Get<GetTeamResponse>(url).then((res) => {
      setData(res.data);
    })
  );

  const updateTeam = useSWRMutation(
    "/v1/team",
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        name: data.name,
        description: data.description,
        profile: data.profile,
      }),
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

  if (isLoading) return;

  if (error) return;

  return (
    <div>
      <label className="text-[18px] font-san-bold">Profile</label>
      <ImageUploader image={data.profile} setPath={handleImage} mode="edit" />
      <div className="mt-5">
        <label className="text-[18px] font-san-bold">Team Name</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.name}
          onChange={handleInput}
          name="name"
        />
      </div>
      <div className="mt-[30px]">
        <label className="text-[18px] font-san-bold">description</label>
        <input
          id="description"
          className="mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.description}
          onChange={handleInput}
          name="description"
        />
      </div>
      <button
        className="m-auto mt-[40px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white text-[16px] font-san-bold"
        onClick={updateTeam.trigger}
      >
        Update
      </button>
    </div>
  );
};

export default TeamSettingContent;
