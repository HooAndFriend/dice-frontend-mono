"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** React Imports
import { KeyboardEvent } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";
import SwrProvider from "@/src/components/provider/swr-provider";

// ** Recoil Imports
import { useSetRecoilState } from "recoil";
import { AuthState, UserState, WorkspaceState } from "@/src/app";

// ** Component Imports
import LoginContainerView from "./login-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";
import { firebaseLogin } from "@/src/utils/firebase-auth";

// ** Type Imports
import {
  DiceLoginParma,
  DiceLoginResponse,
  DiceSocialLoginResponse,
  SocialLoginParams,
  SocialType,
} from "@/src/type/auth";

// ** Dialog Imports
import { useDialog } from "../../context/DialogContext";

const LoginContainer = () => {
  const { data: loginUser, handleInput } = useInput<DiceLoginParma>({
    email: "",
    password: "",
  });

  const setAuthState = useSetRecoilState(AuthState);
  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);

  const { handleOpen } = useDialog();

  const router = useRouter();
  const searchParams = useSearchParams();

  const login = useSWRMutation(
    "/v1/auth",
    async (url: string) => await Post<DiceLoginResponse>(url, loginUser),
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

        setWorkspaceState({
          id: data.workspace[0].id,
          name: data.workspace[0].name,
          profile: data.workspace[0].profile,
          uuid: data.workspace[0].uuid,
          workspaceFunction: data.workspace[0].workspaceFunction,
        });

        console.log(1, {
          id: data.workspace[0].id,
          name: data.workspace[0].name,
          profile: data.workspace[0].profile,
          uuid: data.workspace[0].uuid,
          workspaceFunction: data.workspace[0].workspaceFunction,
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

  const socialLogin = useSWRMutation(
    "/v1/auth/social",
    async (url: string, { arg }: { arg: SocialLoginParams }) =>
      await Post<DiceSocialLoginResponse>(url, arg),
    {
      onSuccess: ({ data }: any) => {
        setAuthState({
          accessToken: data.token.accessToken,
          refreshToken: data.token.refreshToken,
        });
        setUserState({
          email: data.user.email,
          profile: data.user.profile,
          nickname: data.user.nickname,
        });
        setWorkspaceState({
          id: data.workspace.id,
          name: data.workspace.name,
          profile: data.workspace.profile,
          uuid: data.workspace.uuid,
          workspaceFunction: data.workspace.workspaceFunction,
        });

        router.push("/dashboard");
      },
      onError: (error) => {
        if (error.response.data.statusCode === 404) {
          const arg: SocialLoginParams = JSON.parse(error.config.data);

          const uuid = searchParams.get("uuid");
          if (uuid) {
            router.push(
              `/social-signup?token=${arg.token}&type=${arg.type}&uuid=${uuid}`
            );

            return;
          }

          router.push(`/social-signup?token=${arg.token}&type=${arg.type}`);
        }

        return;
      },
    }
  );

  const handleSignup = () => {
    const uuid = searchParams.get("uuid");
    if (uuid) {
      router.push(`/signup?uuid=${uuid}`);

      return;
    }

    router.push("/signup");
  };

  const handleSocialLogin = async (type: SocialType) => {
    firebaseLogin(type).then((res) => {
      if (!res) return;

      socialLogin.trigger({ token: res, type });
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login.trigger();
    }
  };

  return (
    <SwrProvider>
      <LoginContainerView
        loginUser={loginUser}
        handleInput={handleInput}
        handleLogin={login.trigger}
        handleSocialLogin={handleSocialLogin}
        handleSignup={handleSignup}
        handleEnter={handleEnter}
      />
    </SwrProvider>
  );
};

export default LoginContainer;
