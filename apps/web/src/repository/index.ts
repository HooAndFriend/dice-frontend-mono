import { CommonResponse } from "@/type/common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const client = axios.create({
  baseURL: "/api",
});

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await client.get(url, config);

  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  return await client.post(url, data, config);
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await client.delete(url, config);

  return response;
};

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use((res) => {
  return res;
});
