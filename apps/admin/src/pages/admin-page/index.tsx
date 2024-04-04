// ** Component Imports
import AdminPageView from './admin-page'

// ** Service Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/index'

// ** Type Imports
import { GetAdminList } from '@/src/type/admin'

// ** React Imports
import { useEffect } from 'react'

const AdminPage = () => {
  const { accessToken } = useRecoilValue(AuthState)

  const { data, error, isLoading, mutate } = useSWR(
    '/v1/admin',
    async (url: string) => {
      return await Get<GetAdminList>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
  )

  if (isLoading) return null

  useEffect(() => {
    mutate()
  }, [data])

  const slicingPhone = (phoneNum) => {
    return (
      phoneNum.slice(0, 3) +
      '-' +
      phoneNum.slice(3, 7) +
      '-' +
      phoneNum.slice(7)
    )
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDay()
    ).slice(-2)}
    ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${(
      '0' + d.getSeconds()
    ).slice(-2)}`
  }

  return (
    <AdminPageView
      data={data?.data.data}
      slicingPhone={slicingPhone}
      formatDate={formatDate}
    />
  )
}

export default AdminPage
