import type {
  UserLoginResponse,
  UserRegisterResponse,
  UserSocialLoginResponse,
  UserSocialRegisterResponse,
} from "@/types/api/user";
import type {
  UserLoginParams,
  UserRegisterParams,
  UserSocialLoginParams,
  UserSocialRegisterParams,
} from "@/types/user";
import { api } from "..";

// Auth Api CreateApi
export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ["Auth"],
  })
  .injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
      // Query
      // Mutation
      login: builder.mutation<UserLoginResponse, UserLoginParams>({
        query: (args) => ({
          url: "/v1/auth",
          method: "POST",
          body: args,
        }),
      }),
      socialLogin: builder.mutation<
        UserSocialLoginResponse,
        UserSocialLoginParams
      >({
        query: (args) => ({
          url: "/v1/auth/social",
          method: "POST",
          body: args,
        }),
      }),
      register: builder.mutation<UserRegisterResponse, UserRegisterParams>({
        query: (args) => ({
          url: "/v1/auth/user",
          method: "POST",
          body: args,
        }),
      }),
      socialRegister: builder.mutation<
        UserSocialRegisterResponse,
        UserSocialRegisterParams
      >({
        query: (args) => ({
          url: "/v1/auth/social/user",
          method: "POST",
          body: args,
        }),
      }),
    }),
  });

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialLoginMutation,
  useSocialRegisterMutation,
} = authApi;
