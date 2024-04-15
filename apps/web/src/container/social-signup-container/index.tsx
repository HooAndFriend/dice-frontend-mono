"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** React Imports
import { KeyboardEvent } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Recoil Imports
import { AuthState, TeamState, UserState, WorkspaceState } from "@/src/app";
import { useSetRecoilState } from "recoil";

// ** Component Imports
import SocialSignupContainerView from "./social-signup-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { DiceSocialSignupResponse, SocialSignupParams } from "@/src/type/auth";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const SocialSignupContainer = () => {
  const { data: signupUser, handleInput } = useInput<SocialSignupParams>({
    email: "",
    nickname: "",
    token: "",
    type: "",
    fcmToken: "",
  });

  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);
  const setTeamState = useSetRecoilState(TeamState);
  const setAuthState = useSetRecoilState(AuthState);

  const { handleOpen } = useDialog();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCancel = () => {
    router.push("/");
  };

  const handleJoin = () => {
    if (signupUser.email === "") {
      handleOpen({
        title: "Error",
        message: "Enter Email",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    if (signupUser.nickname === "") {
      handleOpen({
        title: "Error",
        message: "Enter Nickname",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });
      return;
    }

    socialSignup.trigger();
  };

  const socialSignup = useSWRMutation(
    "/v1/auth/social/user",
    async (url: string) =>
      await Post<DiceSocialSignupResponse>(url, {
        ...signupUser,
        token: searchParams.get("token"),
        type: searchParams.get("type"),
        uuid: searchParams.get("uuid") ? searchParams.get("uuid") : null,
      }),
    {
      onSuccess: ({ data }) => {
        setAuthState({
          accessToken: data.token.accessToken,
          refreshToken: data.token.refreshToken,
        });
        setUserState({
          email: data.user.email,
          profile: data.user.profile,
          nickname: data.user.nickname,
        });
        setTeamState({
          id: data.team.id,
          name: data.team.name,
          profile: data.team.profile,
          uuid: data.team.uuid,
          isPersonal: true,
          role: "ADMIN",
        });

        setWorkspaceState({
          id: data.team.workspace[0].id,
          name: data.team.workspace[0].name,
          profile: data.team.workspace[0].profile,
          uuid: data.team.workspace[0].uuid,
          workspaceFunction: data.team.workspace[0].workspaceFunction,
          role: "ADMIN",
        });
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
      handleJoin();
    }
  };

  return (
    <SocialSignupContainerView
      handleInput={handleInput}
      signupUser={signupUser}
      handleJoin={handleJoin}
      handleCancel={handleCancel}
      handleEnter={handleEnter}
    />
  );
};

export default SocialSignupContainer;
