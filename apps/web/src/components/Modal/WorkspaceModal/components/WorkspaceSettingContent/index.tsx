// ** Recoil Imports
import { AuthState, WorkspaceState } from "@/src/app";
import { useRecoilState, useRecoilValue } from "recoil";

// ** Component Imports
import { ImageUploader } from "@/src/components/ImageUploader";

// ** Type Imports
import {
  GetWorkspaceInfoResponse,
  WorkspaceDetailInfo,
} from "@/src/type/workspace";
import { CommonResponse } from "@/src/type/common";

// ** Service Imports
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR, { mutate } from "swr";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { useEffect } from "react";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

const WorkspaceSettingContent = () => {
  const { data, handleInput, setData } = useInput<WorkspaceDetailInfo>({
    id: 0,
    name: "",
    profile: "",
    comment: "",
  });

  const [workspaceState, setWorkspaceState] = useRecoilState(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const {
    error,
    isLoading,
    data: workspaceData,
  } = useSWR("/v1/workspace/home", async (url) =>
    Get<GetWorkspaceInfoResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": workspaceState.uuid,
      },
    })
  );

  const updateWorkspace = useSWRMutation(
    "/v1/workspace",
    async (url: string) =>
      await Put<CommonResponse<void>>(
        url,
        {
          name: data.name,
          comment: data.comment,
          profile: data.profile,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "team-code": workspaceState.uuid,
          },
        }
      ),
    {
      onSuccess: () => {
        mutate("/v1/workspace/home");

        setWorkspaceState((cur) => ({
          ...cur,
          profile: data.profile,
          name: data.name,
          comment: data.comment,
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

  useEffect(() => {
    if (isLoading) return;

    if (error) return;

    setData(workspaceData.data);
  }, [workspaceData]);

  if (isLoading) return;

  if (error) return;

  return (
    <div>
      <label className="text-xl font-bold font-spoqa">Profile</label>
      <ImageUploader image={data.profile} mode="edit" setPath={handleImage} />
      <div className="mt-6">
        <label className="text-xl font-bold font-spoqa">Workspace Name</label>
        <input
          id="workspace name"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.name}
          onChange={handleInput}
          name="name"
        />
      </div>
      <div className="mt-[30px]">
        <label className="text-xl font-bold font-spoqa">description</label>
        <input
          id="description"
          className="text-left mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.comment}
          onChange={handleInput}
          name="comment"
        />
      </div>
      <button
        className="m-auto mt-[30px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg"
        onClick={updateWorkspace.trigger}
      >
        Update
      </button>
    </div>
  );
};

export default WorkspaceSettingContent;
