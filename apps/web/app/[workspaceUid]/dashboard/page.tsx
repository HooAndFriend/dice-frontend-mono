'use client'

// ** Utils Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import { GetMyTicketListResponse } from '@/src/type/ticket'

// ** Component Imports
import DashboardContainer from '@/src/container/dashboard-container'
import { useRecoilValue } from 'recoil'
import { UserState } from '@/src/app'

const DashboardPage = () => {
  const { data, isLoading, mutate } = useSWR('/v1/ticket/my', async (url) => {
    return Get<GetMyTicketListResponse>(url)
  })

  const { email } = useRecoilValue(UserState)

  // console.log('data', data.data.data)

  return (
    <DashboardContainer
      ticketData={isLoading ? [] : data.data.data}
      email={email}
    />
  )
}

export default DashboardPage
