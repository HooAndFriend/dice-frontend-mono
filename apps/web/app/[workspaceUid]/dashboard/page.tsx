'use client'

// ** Utils Imports
import { Get } from '@/src/repository'
import useSWR from 'swr'

// ** Type Imports
import {
  GetMyTicketListResponse,
  GetTicketStatsResponse,
} from '@/src/type/ticket'

// ** Component Imports
import DashboardContainer from '@/src/container/dashboard-container'
import { useRecoilValue } from 'recoil'
import { UserState } from '@/src/app'

const DashboardPage = () => {
  const { email } = useRecoilValue(UserState)

  const { data, isLoading, mutate } = useSWR('/v1/ticket/my', async (url) => {
    return Get<GetMyTicketListResponse>(url)
  })

  const { data: statsData, isLoading: statsIsLoading } = useSWR(
    '/v1/ticket/stats',
    async (url) => {
      return Get<GetTicketStatsResponse>(url)
    },
  )

  console.log('statsdata', statsData)

  return (
    <DashboardContainer
      ticketStats={
        statsIsLoading
          ? {
              totalCount: 0,
              totalDoneCount: 0,
              user: {
                myCount: 0,
                myDoneCount: 0,
                myTodayCount: 0,
                myTodayDoneCount: 0,
              },
              userList: [],
            }
          : statsData.data
      }
      ticketData={isLoading ? [] : data.data.data}
      email={email}
    />
  )
}

export default DashboardPage
