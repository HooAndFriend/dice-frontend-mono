"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/repository";
import SwrProvider from "@/components/provider/swr-provider";

// ** Recoil Imports
import { useSetRecoilState } from "recoil";
import { AuthState } from "@/app";

// ** Component Imports
import LoginContainerView from "./login-container";

// ** Utils Imports
import useInput from "@/hooks/useInput";

// ** Type Imports
import { DiceLoginParma, SocialLoginParams, SocialType } from "@/type/auth";
import { firebaseLogin } from "@/utils/firebase-auth";
import { useState } from "react";

const LoginContainer = () => {
  const { data: loginUser, handleInput } = useInput<DiceLoginParma>({
    email: "",
    password: "",
  });

  const [socialLoginUser, setSocialLoginUser] = useState<SocialLoginParams>({
    type: "",
    token: "",
  });

  const setAuthState = useSetRecoilState(AuthState);

  const router = useRouter();

  const login = useSWRMutation(
    "/v1/auth",
    async (url: string) => await Post<any>(url, loginUser),
    {
      onSuccess: ({ data }) => {
        setAuthState({
          accessToken: data.data.token.refreshToken,
          refreshToken: data.data.token.refreshToken,
          username: "",
        });
        router.push("/dashboard");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const socialLogin = useSWRMutation(
    "/v1/auth/social",
    async (url: string, { arg }: { arg: SocialLoginParams }) =>
      await Post<any>(url, arg),
    {
      onSuccess: ({ data }: any) => {
        setAuthState({
          accessToken: data.data.token.refreshToken,
          refreshToken: data.data.token.refreshToken,
          username: "",
        });
        router.push("/dashboard");
      },
      onError: (error) => {
        if (error.response.data.statusCode === 404) {
          router.push(
            `/social/signup?token=${socialLoginUser}&type=${socialLoginUser.type}`
          );

          return;
        }
      },
    }
  );

  const handleSocialLogin = async (type: SocialType) => {
    firebaseLogin(type).then((res) => {
      if (!res) return;

      setSocialLoginUser({ token: res, type });
      socialLogin.trigger({ token: res, type });
    });
  };

  return (
    <SwrProvider>
      <LoginContainerView
        loginUser={loginUser}
        handleInput={handleInput}
        handleLogin={login.trigger}
        handleSocialLogin={handleSocialLogin}
      />
    </SwrProvider>
  );
};

export default LoginContainer;
