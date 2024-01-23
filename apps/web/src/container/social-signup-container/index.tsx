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

const SocialSignupContainer = () => {
  const { data: signupUser, handleInput } = useInput<SocialSignupParams>({
    email: "",
    nickname: "",
    token: "",
    type: "",
  });

  const setAuthState = useSetRecoilState(AuthState);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCancel = () => {
    router.push("/");
  };

  const socialSignup = useSWRMutation(
    "/v1/auth/social/user",
    async (url: string) =>
      await Post<any>(url, {
        ...signupUser,
        token: searchParams.get("token"),
        type: searchParams.get("type"),
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
        console.log(error);
      },
    }
  );

  return (
    <SwrProvider>
      <SocialSignupContainerView
        handleInput={handleInput}
        signupUser={signupUser}
        handleJoin={socialSignup.trigger}
        handleCancel={handleCancel}
      />
    </SwrProvider>
  );
};

export default SocialSignupContainer;
