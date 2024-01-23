"use client";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** React Imports
import { ChangeEvent, useState } from "react";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/repository";
import SwrProvider from "@/components/provider/swr-provider";

// ** Recoil Imports
import { useSetRecoilState } from "recoil";
import { AuthState } from "@/app";

// ** Component Imports
import SignupContainerView from "./signup-container";

// ** Utils Imports
import useInput from "@/hooks/useInput";

// ** Type Imports
import { DiceSignupParams } from "@/type/auth";

const SignupContainer = () => {
  const { data: signupUser, handleInput } = useInput<DiceSignupParams>({
    email: "",
    password: "",
    nickname: "",
  });

  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const setAuthState = useSetRecoilState(AuthState);

  const router = useRouter();

  const handleCancel = () => {
    router.push("/");
  };

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const signup = useSWRMutation(
    "/v1/auth/user",
    async (url: string) => await Post<any>(url, signupUser),
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
      <SignupContainerView
        signupUser={signupUser}
        passwordCheck={passwordCheck}
        handlePasswordCheck={handlePasswordCheck}
        handleInput={handleInput}
        handleJoin={signup.trigger}
        handleCancel={handleCancel}
      />
    </SwrProvider>
  );
};

export default SignupContainer;
