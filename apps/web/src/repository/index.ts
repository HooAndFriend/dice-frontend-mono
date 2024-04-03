// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Axios Imports
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// ** Recoil Imports
import {
  AuthStateType,
  TeamStateType,
  UserStateType,
  WorkspaceStateType,
} from "../app";

export const client = axios.create({
  baseURL: "/api",
});

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.get(url, config);

  return response.data;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.post(url, data, config);

  return response.data;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.put(url, data, config);

  return response.data;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.patch(url, data, config);

  return response.data;
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.delete(url, config);

  return response.data;
};

client.interceptors.request.use((config) => {
  const recoilValue: {
    authState: AuthStateType;
    userState: UserStateType;
    workspaceState: WorkspaceStateType;
    teamState: TeamStateType;
  } = JSON.parse(localStorage.getItem("recoil-persist"));

  if (recoilValue) {
    config.headers["Authorization"] =
      `Bearer ${recoilValue.authState.accessToken}`;
    config.headers["workspace-code"] = recoilValue.workspaceState.uuid;
    config.headers["team-code"] = recoilValue.teamState.uuid;
  }

  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const err = error as AxiosError;

    return Promise.reject(error);
  }
);
