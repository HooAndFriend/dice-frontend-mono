"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { KeyboardEvent } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";
import SwrProvider from "@/src/components/provider/swr-provider";

// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, TeamState } from "@/src/app";

// ** Component Imports
import SaveWorkspaceContainerView from "./save-workspace-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { SaveWorkspaceParam } from "@/src/type/workspace";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const SaveWorkspaceContainer = () => {
  const { data, handleInput } = useInput<SaveWorkspaceParam>({
    name: "",
    comment: "",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450",
  });

  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(TeamState);

  const { handleOpen } = useDialog();

  const router = useRouter();

  const saveWorkspace = useSWRMutation(
    "/v1/workspace",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, data, {
        headers: { Authorization: `Bearer ${accessToken}`, "team-code": uuid },
      }),
    {
      onSuccess: ({ data }) => {
        router.push("/dashboard");
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

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveWorkspace.trigger();
    }
  };

  return (
    <SwrProvider>
      <SaveWorkspaceContainerView
        data={data}
        handleInput={handleInput}
        handleEnter={handleEnter}
        handleWorkspaceTeam={saveWorkspace.trigger}
      />
    </SwrProvider>
  );
};

export default SaveWorkspaceContainer;
