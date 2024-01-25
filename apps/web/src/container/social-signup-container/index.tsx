"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/repository";
import SwrProvider from "@/components/provider/swr-provider";

// ** Recoil Imports
import { useSetRecoilState } from "recoil";
import { AuthState } from "@/app";

// ** Component Imports
import SocialSignupContainerView from "./social-signup-container";

// ** Utils Imports
import useInput from "@/hooks/useInput";

// ** Type Imports
import { SocialSignupParams } from "@/type/auth";

// ** Context Imports
import { useDialog } from "@/context/DialogContext";

const SocialSignupContainer = () => {
  const { data: signupUser, handleInput } = useInput<SocialSignupParams>({
    email: "",
    nickname: "",
    token: "",
    type: "",
  });

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
      });

      return;
    }

    if (signupUser.nickname === "") {
      handleOpen({
        title: "Error",
        message: "Enter Nickname",
        logLevel: "warn",
        buttonText: "Close",
      });
      return;
    }

    socialSignup.trigger();
  };

  const socialSignup = useSWRMutation(
    "/v1/auth/social/user",
    async (url: string) =>
      await Post<any>(url, {
        ...signupUser,
        token: searchParams.get("token"),
        type: searchParams.get("type"),
        uuid: searchParams.get("uuid") ? searchParams.get("uuid") : null,
      }),
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
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
        });
      },
    }
  );

  return (
    <SwrProvider>
      <SocialSignupContainerView
        handleInput={handleInput}
        signupUser={signupUser}
        handleJoin={handleJoin}
        handleCancel={handleCancel}
      />
    </SwrProvider>
  );
};

export default SocialSignupContainer;
