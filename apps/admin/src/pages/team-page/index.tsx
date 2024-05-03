// ** React Imports
import { useEffect } from 'react'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/auth'
// ** Component Imports
import TeamPageView from './team-page'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'
import dayjs from 'dayjs'

// ** Type Imports
import { GetTeamListResponse, DateRange, TeamInfoQuery } from '@/src/type/team'

// ** SWR Imports
import useSWR from 'swr'
import { Get } from '@/src/repository';

const TeamPage = () => {

  const { accessToken } = useRecoilValue(AuthState)
  const { data: query, setData: setQuery } = useInput<TeamInfoQuery>({
    page: 0,
    pageSize: 10,
    name: '',
    createdId: '',
    description: '',
    createdStartDate: '2024-01-01',
    createdEndDate: dayjs().set('month', 11).toString(),
  })

  const { data, error, isLoading, mutate } = useSWR('/v1/team', async (url) => {
    const { page, pageSize, name, createdId, description, createdStartDate, createdEndDate } = query
    const params = {
      ...(page !== null && { page }),
      pageSize,
      ...(name !== null && { name }),
      ...(createdId !== null && { createdId }),
      ...(description !== null && { description }),
      ...(createdStartDate !== null && { createdStartDate }),
      ...(createdEndDate !== null && { createdEndDate: dayjs(createdEndDate).add(1, 'day').format("YYYY-MM-DD") })
    }

    return Get<GetTeamListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    })
  })


  const handlePage = (page: number) => {
    setQuery({ ...query, page })
  }

  const handleSearch = (
    createdDate: DateRange,
    teamName: string,
    createdId: string,
    description: string
  ) => {
    const { startDate: createdStartDate, endDate: createdEndDate } = createdDate
    setQuery({
      ...query,
      createdStartDate,
      createdEndDate,
      name: teamName,
      createdId,
      description
    })
  }

  useEffect(() => {
    mutate()
  }, [query])

  if (isLoading || !data) return <div></div>
  if (error) return <div></div>

  return (
    <TeamPageView
      query={query}
      count={data.data.count}
      teamData={data.data.data}
      handleSearch={handleSearch}
      handlePage={handlePage}
    />
  )
}
export default TeamPage
