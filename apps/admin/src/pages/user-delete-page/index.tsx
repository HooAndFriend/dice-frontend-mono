// ** Component Imports
import UserDeletePageView from './user-delete-page'

// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/auth'

// ** SWR Imports
import useSWR, { mutate } from 'swr';
import { Get } from '@/src/repository';

// ** Utils Imports
import useInput from '@/src/hooks/useInput';

// ** Type Imports
import { DeleteUserQuery, GetDeleteUserListResponse } from '@/src/type/user-delete';
import { DateRange } from '@/src/type/user';

const handleDateChange = (endDate) => {
  const date = new Date(endDate);
  const nextDay = new Date(date.setDate(date.getDate() + 1));
  return nextDay.toISOString().substring(0, 10);
}

const UserDeletePage = () => {
  const { accessToken } = useRecoilValue(AuthState);
  const { data: query, setData: setQuery } = useInput<DeleteUserQuery>({
    createdStartDate: '2024-01-01',
    createdEndDate: handleDateChange(new Date().toLocaleDateString()),
    deletedStartDate: '2024-01-01',
    deletedEndDate: handleDateChange(new Date().toLocaleDateString()),
    nickname: '',
    type: [],
  })
  const { data, error, isLoading, mutate } = useSWR('/v1/user/delete', async (url) => {
    const { createdStartDate, createdEndDate, deletedStartDate, deletedEndDate, nickname, type } = query

    const params = {
      ...(createdStartDate !== null && { createdStartDate }),
      ...(createdEndDate !== null && {
        createdEndDate: handleDateChange(createdEndDate),
      }),
      ...(deletedStartDate !== null && { deletedStartDate }),
      ...(deletedEndDate !== null && {
        lastLoginEndDate: handleDateChange(deletedEndDate),
      }),
      ...(nickname !== null && { nickname }),
      ...(type !== null && { type }),
    }

    return Get<GetDeleteUserListResponse>(url, {
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
    const { startDate: lastLoginStartDate, endDate: lastLoginEndDate } =lastLoginDate

    query.createdStartDate = createdStartDate
    query.createdEndDate = createdEndDate
    query.deletedStartDate = lastLoginStartDate
    query.deletedEndDate = lastLoginEndDate
    query.nickname = nickname
    // query.type = types;
    mutate()
  }
  if (isLoading || !data) return <div></div>

  if (error) return <div></div>
  return (
    <UserDeletePageView
      query={query}
      count={data.data.count}
      userData={data.data.data}
      handleSearch={handleSearch}
    />
  )
}

export default UserDeletePage
