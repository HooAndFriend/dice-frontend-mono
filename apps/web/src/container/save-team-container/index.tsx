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
import { AuthState } from "@/src/app";

// ** Component Imports
import SaveTeamContainerView from "./save-team-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { SaveTeamParam } from "@/src/type/team";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";
import { CommonResponse } from "@/src/type/common";

const SaveTeamContainer = () => {
  const { data, handleInput, setData } = useInput<SaveTeamParam>({
    name: "",
    description: "",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450",
  });

  const { accessToken } = useRecoilValue(AuthState);

  const { handleOpen } = useDialog();

  const router = useRouter();

  const saveTeam = useSWRMutation(
    "/v1/team",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
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

  const handleImage = (profile: string) => {
    setData((cur) => ({ ...cur, profile }));
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveTeam.trigger();
    }
  };

  return (
    <SwrProvider>
      <SaveTeamContainerView
        data={data}
        handleInput={handleInput}
        handleEnter={handleEnter}
        handleSaveTeam={saveTeam.trigger}
        handleImage={handleImage}
      />
    </SwrProvider>
  );
};

export default SaveTeamContainer;
