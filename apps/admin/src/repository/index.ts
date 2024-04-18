import { CommonResponse } from '@/src/type/common'
import axios, { AxiosRequestConfig } from 'axios'
import { AuthStateProps } from '../app/auth'

export const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api/admin',
})

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.get(url, config)

  return response.data
}

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.post(url, data, config)

  return response.data
}

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.put(url, data, config)

  return response.data
}

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.patch(url, data, config)

  return response.data
}

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> => {
  const response = await client.delete(url, config)

  return response.data
}

client.interceptors.request.use((config) => {
  const val = localStorage.getItem('recoil-persist')
  const recoilValue: {
    authState: AuthStateProps
  } = val
    ? JSON.parse(val)
    : { authState: { accessToken: '', refreshToken: '' } }

  if (recoilValue) {
    config.headers[
      'Authorization'
    ] = `Bearer ${recoilValue.authState.accessToken}`
  }

  return config
})

client.interceptors.response.use((res) => {
  return res
})
