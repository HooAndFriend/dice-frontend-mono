// ** Component Imports
import AdminPageView from './admin-page'

// ** Service Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/index'

// ** Type Imports
import { GetAdminListResponse } from '@/src/type/admin'

// ** React Imports
import { useEffect } from 'react'

const AdminPage = () => {
  const { accessToken } = useRecoilValue(AuthState)

  const { data, error, isLoading, mutate } = useSWR(
    '/v1/admin',
    async (url) => {
      return await Get<GetAdminListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
  )

  useEffect(() => {
    mutate()
  }, [data])

  if (isLoading) return null
  if (!data) return null

  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDay()
    ).slice(-2)}
    ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${(
      '0' + d.getSeconds()
    ).slice(-2)}`
  }

  return <AdminPageView data={data.data.data} formatDate={formatDate} />
}

export default AdminPage
