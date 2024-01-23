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
import { DiceLoginParma } from "@/type/auth";

const LoginContainer = () => {
  const { data: loginUser, handleInput } = useInput<DiceLoginParma>({
    email: "",
    password: "",
  });

  const setAuthState = useSetRecoilState(AuthState);

  const router = useRouter();

  const login = useSWRMutation(
    "Login",
    () => Post<any>("/v1/auth", loginUser),
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
      <LoginContainerView
        loginUser={loginUser}
        handleInput={handleInput}
        login={login.trigger}
      />
    </SwrProvider>
  );
};

export default LoginContainer;
