// ** Redux Imports
import { authApi } from '@/services'
import { RootState } from '@/store'
import { createSlice } from '@reduxjs/toolkit'

export interface UserTypeProps {
  user: {
    token: { accessToken: string; refreshToken: string }
    user: { nickname: string }
  }
}

const initialState: UserTypeProps = {
  user: {
    token: {
      accessToken: '',
      refreshToken: '',
    },
    user: {
      nickname: '',
    },
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { ...initialState.user }
    },
  },
  extraReducers: (builder) => {},
})

export default authSlice.reducer

export const getAccessToken = (state: RootState) =>
  state.auth.user.token.accessToken

export const { logout } = authSlice.actions
