import { CommonResponse } from "@/src/type/common";
import axios, { AxiosRequestConfig } from "axios";

export const client = axios.create({
  baseURL: "/api",
});

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.get(url, config);

  return response.data;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.post(url, data, config);

  return response.data;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.put(url, data, config);

  return response.data;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.patch(url, data, config);

  return response.data;
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.delete(url, config);

  return response.data;
};

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use((res) => {
  return res;
});
