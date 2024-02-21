// ** React Imports
import { AuthState } from '@/src/app/auth'
import { useMemo } from 'react'

// ** Router Imports
import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export function ProtectRoute() {
  const { accessToken } = useRecoilValue(AuthState)

  const isAuthorization = useMemo(
    () => (accessToken === '' ? false : true),
    [accessToken],
  )

  return isAuthorization ? <Outlet /> : <Navigate to="/" />
}

export function PublicRoute() {
  const { accessToken } = useRecoilValue(AuthState)
  const isAuthorization = useMemo(
    () => (accessToken === '' ? false : true),
    [accessToken],
  )

  return isAuthorization ? <Navigate to="/dashboard" /> : <Outlet />
}
