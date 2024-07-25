"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { KeyboardEvent } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

// ** Component Imports
import SaveWorkspaceContainer from "@/src/container/save-workspace-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { SaveWorkspaceParam } from "@/src/type/workspace";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

export default function Signup(): JSX.Element {
  const { data, handleInput, setData } = useInput<SaveWorkspaceParam>({
    name: "",
    comment: "",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450",
  });

  const { uuid } = useRecoilValue(WorkspaceState);
  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const router = useRouter();

  const saveWorkspace = useSWRMutation(
    "/v1/workspace",
    async (url: string) => await Post<CommonResponse<void>>(url, data),
    {
      onSuccess: ({ data }) => {
        router.push(`/dashboard/${uuid}`);
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

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveWorkspace.trigger();
    }
  };

  return (
    <SaveWorkspaceContainer
      data={data}
      handleInput={handleInput}
      handleEnter={handleEnter}
      handleWorkspaceTeam={saveWorkspace.trigger}
      handleImage={handleImage}
    />
  );
}
