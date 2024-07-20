"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** React Imports
import { KeyboardEvent, useEffect } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Recoil Imports
import { AuthState, UserState, WorkspaceState } from "@/src/app";
import { useSetRecoilState } from "recoil";

// ** Component Imports
import LoginContainerView from "./login-container";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";
import { firebaseLogin } from "@/src/utils/firebase-auth";
import { requestNotificationPermission } from "@/src/utils/firebase-push";

// ** Type Imports
import {
  DiceLoginParma,
  DiceLoginResponse,
  DiceSocialLoginResponse,
  DiceSocialSignupResponse,
  SocialLoginParams,
  SocialSignupParams,
  SocialType,
} from "@/src/type/auth";

// ** Dialog Imports
import { useDialog } from "../../context/DialogContext";

const LoginContainer = () => {
  const {
    data: loginUser,
    handleInput,
    setData,
  } = useInput<DiceLoginParma>({
    email: "",
    password: "",
    fcmToken: "",
  });

  const setUserState = useSetRecoilState(UserState);
  const setWorkspaceState = useSetRecoilState(WorkspaceState);
  const setAuthState = useSetRecoilState(AuthState);

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
          workspaceId: data.workspace[0].workspaceId,
          name: data.workspace[0].name,
          profile: data.workspace[0].profile,
          uuid: data.workspace[0].uuid,
          role: "ADMIN",
        });
        router.push(`/dashboard`);
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

  const socialSignup = useSWRMutation(
    "/v1/auth/social/user",
    async (url: string, { arg }: { arg: SocialSignupParams }) =>
      await Post<DiceSocialSignupResponse>(url, {
        ...arg,
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

        setWorkspaceState({
          workspaceId: data.workspace.workspaceId,
          name: data.workspace.name,
          profile: data.workspace.profile,
          uuid: data.workspace.uuid,
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

  const socialLogin = useSWRMutation(
    "/v1/auth/social",
    async (
      url: string,
      {
        arg,
      }: {
        arg: SocialLoginParams;
      }
    ) =>
      await Post<DiceSocialLoginResponse>(url, {
        ...arg,
        fcmToken: loginUser.fcmToken,
      }),
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
          workspaceId: data.workspace[0].workspaceId,
          name: data.workspace[0].name,
          profile: data.workspace[0].profile,
          uuid: data.workspace[0].uuid,
          role: "ADMIN",
        });

        router.push(`/dashboard`);
      },
      onError: (error) => {
        if (error.response.data.statusCode === 404) {
          const arg: SocialLoginParams = JSON.parse(error.config.data);

          const uuid = searchParams.get("uuid");

          socialSignup.trigger({
            token: arg.token,
            type: arg.type,
            email: arg.email,
            nickname: arg.displayName,
            fcmToken: loginUser.fcmToken,
            uuid: uuid || undefined,
          });
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

      socialLogin.trigger({
        token: res.uid,
        type,
        email: res.email,
        displayName: res.displayName,
      });
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login.trigger();
    }
  };

  useEffect(() => {
    requestNotificationPermission().then((fcmToken) => {
      setData((c) => ({ ...c, fcmToken }));
    });
  }, []);

  return (
    <LoginContainerView
      loginUser={loginUser}
      handleInput={handleInput}
      handleLogin={login.trigger}
      handleSocialLogin={handleSocialLogin}
      handleSignup={handleSignup}
      handleEnter={handleEnter}
    />
  );
};

export default LoginContainer;
