// ** Recoil Imports
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthState, TeamState, WorkspaceState } from "@/src/app";

// ** Component Imports
import SettingContentView from "./setting-content";
import useSWR, { mutate } from "swr";
import {
  GetWorkspaceInfoResponse,
  WorkspaceDetailInfo,
} from "@/src/type/workspace";
import { Get, Put } from "@/src/repository";
import useInput from "@/src/hooks/useInput";
import useSWRMutation from "swr/mutation";
import { CommonResponse } from "@/src/type/common";
import { useDialog } from "@/src/context/DialogContext";

const SettingContent = () => {
  const { data, handleInput, setData } = useInput<WorkspaceDetailInfo>({
    id: 0,
    name: "",
    profile: "",
    comment: "",
  });

  const { accessToken } = useRecoilValue(AuthState);
  const [workspace, setWorkspace] = useRecoilState(WorkspaceState);

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/workspace/home", async (url) =>
    Get<GetWorkspaceInfoResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "workspace-code": workspace.uuid,
      },
    }).then((res) => {
      setData(res.data);
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
            "team-code": workspace.uuid,
          },
        }
      ),
    {
      onSuccess: () => {
        mutate("/v1/workspace/home");

        setWorkspace((cur) => ({
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

  if (isLoading) return;

  return (
    <SettingContentView
      data={data}
      handleInput={handleInput}
      handleUpdate={updateWorkspace.trigger}
    />
  );
};

export default SettingContent;
