"use client";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** React Imports
import { ChangeEvent, KeyboardEvent, useState } from "react";

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

// ** Context Imports
import { useDialog } from "@/context/DialogContext";

const SignupContainer = () => {
  const { data: signupUser, handleInput } = useInput<DiceSignupParams>({
    email: "",
    password: "",
    nickname: "",
  });

  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const setAuthState = useSetRecoilState(AuthState);

  const { handleOpen } = useDialog();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCancel = () => {
    router.push("/");
  };

  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
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

    if (signupUser.password === "") {
      handleOpen({
        title: "Error",
        message: "Enter Password",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    if (signupUser.password !== passwordCheck) {
      handleOpen({
        title: "Error",
        message: "Check Password",
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

    signup.trigger();
  };

  const signup = useSWRMutation(
    "/v1/auth/user",
    async (url: string) =>
      await Post<any>(url, {
        ...signupUser,
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
    <SwrProvider>
      <SignupContainerView
        signupUser={signupUser}
        passwordCheck={passwordCheck}
        handlePasswordCheck={handlePasswordCheck}
        handleInput={handleInput}
        handleJoin={handleJoin}
        handleCancel={handleCancel}
        handleEnter={handleEnter}
      />
    </SwrProvider>
  );
};

export default SignupContainer;
