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
import { UserState, WorkspaceState } from '@/src/app'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const { email } = useRecoilValue(UserState)
  const { uuid } = useRecoilValue(WorkspaceState)
  const router = useRouter()

  const { data, isLoading, mutate } = useSWR('/v1/ticket/my', async (url) => {
    return Get<GetMyTicketListResponse>(url)
  })

  const { data: statsData, isLoading: statsIsLoading } = useSWR(
    '/v1/ticket/stats',
    async (url) => {
      return Get<GetTicketStatsResponse>(url)
    },
  )

  const handleClick = (ticketId: number) => {
    router.push(`/${uuid}/dashboard/task/epic?ticketId=${ticketId}`)
  }

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
      handleClick={handleClick}
    />
  )
}

export default DashboardPage
