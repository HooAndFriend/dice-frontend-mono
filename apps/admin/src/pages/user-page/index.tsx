import UserPageView from './user-page'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/auth'

// ** SWR Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

// ** Type Imports
import { GetUserListResponse, UserInfoQuery, DateRange } from '@/src/type/user'

export function formatDate(date: Date): string {
  const d = new Date(date)
  d.setHours(d.getHours() + 9)
  return new Date(d).toISOString().replace('T', ' ').substring(0, 19)
}
const handleDateChange = (endDate) => {
  const date = new Date(endDate);
  const nextDay = new Date(date.setDate(date.getDate() + 1));
  return nextDay.toISOString().substring(0, 10);
}

const UserPage = () => {
  const { accessToken } = useRecoilValue(AuthState)
  const { data: query, setData: setQuery } = useInput<UserInfoQuery>({
    createdStartDate: '2024-01-01',
    createdEndDate: new Date().toLocaleDateString(),
    lastLoginStartDate: '2024-01-01',
    lastLoginEndDate: new Date().toLocaleDateString(),
    nickname: '',
    type: [],
    page: 0,
    pageSize: 10,
  })

  const { data, error, isLoading, mutate } = useSWR('/v1/user', async (url) => {
    const { createdStartDate, createdEndDate, lastLoginStartDate, lastLoginEndDate, nickname, type, page, pageSize } = query

    const params = {
      ...(createdStartDate !== null && { createdStartDate }),
      ...(createdEndDate !== null && {
      createdEndDate: handleDateChange(createdEndDate),
      }),
      ...(lastLoginStartDate !== null && { lastLoginStartDate }),
      ...(lastLoginEndDate !== null && {
      lastLoginEndDate: handleDateChange(lastLoginEndDate),
      }),
      ...(nickname !== null && { nickname }),
      ...(type !== null && { type }),
      ...(page !== null && { page }),
      pageSize
    }

    return Get<GetUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    })
  })
  const handleSearch = (
    createdDate: DateRange,
    lastLoginDate: DateRange,
    nickname: string,
    types: string[],
  ) => {
    const { startDate: createdStartDate, endDate: createdEndDate } = createdDate
    const { startDate: lastLoginStartDate, endDate: lastLoginEndDate } = lastLoginDate

    query.createdStartDate = createdStartDate
    query.createdEndDate = createdEndDate
    query.lastLoginStartDate = lastLoginStartDate
    query.lastLoginEndDate = lastLoginEndDate
    query.nickname = nickname
    // query.type = types;
    mutate()
  }
  const handlePage = (page: number) => {
    query.page = page;
    mutate();
  }

  if (isLoading || !data) return <div></div>

  if (error) return <div></div>

  return (
    <UserPageView
      query={query}
      count={data.data.count}
      userData={data.data.data}
      handleSearch={handleSearch}
      handlePage={handlePage}
    />
  )
}

export default UserPage
