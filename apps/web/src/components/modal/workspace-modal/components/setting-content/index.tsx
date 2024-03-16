// ** Recoil Imports
import { useAuthStateSSR, useWorkspaceStateSSR } from "@/src/app";

// ** Component Imports
import SettingContentView from "./setting-content";

// ** Type Imports
import {
  GetWorkspaceInfoResponse,
  WorkspaceDetailInfo,
} from "@/src/type/workspace";
import useInput from "@/src/hooks/useInput";
import { CommonResponse } from "@/src/type/common";

// ** Service Imports
import { Get, Put } from "@/src/repository";
import useSWRMutation from "swr/mutation";
import useSWR, { mutate } from "swr";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const SettingContent = () => {
  const { data, handleInput, setData } = useInput<WorkspaceDetailInfo>({
    id: 0,
    name: "",
    profile: "",
    comment: "",
  });

  const [workspaceState, setWorkspaceState] = useWorkspaceStateSSR();
  const [authState, setAuthState] = useAuthStateSSR();

  const { handleOpen } = useDialog();

  const { error, isLoading } = useSWR("/v1/workspace/home", async (url) =>
    Get<GetWorkspaceInfoResponse>(url, {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        "workspace-code": workspaceState.uuid,
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
