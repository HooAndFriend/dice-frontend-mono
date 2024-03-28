
import useInput from '@/src/hooks/useInput'
import UserPageView from './user-page'
import { GetUserListResponse, UserInfoQuery, DateRange } from '@/src/type/user'
import useSWR from 'swr'
import { useRecoilValue } from 'recoil'
import {AuthState} from '@/src/app/auth'
import { Get } from '@/src/repository'

export function formatDate(date: Date): string {
  const d = new Date(date);
  d.setHours(d.getHours() + 9);
  return new Date(d).toISOString().replace('T', ' ').substring(0, 19);
}

const handleDateChange = (endDate) => {
    const nextDay = new Date(endDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return new Date(nextDay).toISOString().replace('T', ' ').substring(0, 10);
}

const UserPage = () => {

  const { accessToken } = useRecoilValue(AuthState);
  const { data: query, setData: setQuery } = useInput<UserInfoQuery>({
    createdStartDate: '2024-01-01',
    createdEndDate: new Date().toLocaleDateString(),
    lastLoginStartDate: '2024-01-01',
    lastLoginEndDate: new Date().toLocaleDateString(),
    nickname: '',
    type: [],
  });

  const { data, error, isLoading, mutate } = useSWR('/v1/user', async (url) => {
    const { createdStartDate, createdEndDate, lastLoginStartDate, lastLoginEndDate, nickname, type } = query;

    const params = {
      ...(createdStartDate !== null && { createdStartDate }),
      ...(createdEndDate !== null && { createdEndDate: handleDateChange(createdEndDate) }),
      ...(lastLoginStartDate !== null && { lastLoginStartDate }),
      ...(lastLoginEndDate !== null && { lastLoginEndDate: handleDateChange(lastLoginEndDate) }),
      ...(nickname !== null && { nickname }),
      ...(type !== null && { type }),
    };

    return Get<GetUserListResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
  });
  const handleSearch = (createdDate: DateRange, lastLoginDate: DateRange, nickname: string, types: string[]) => {
    const { startDate: createdStartDate, endDate: createdEndDate } = createdDate;
    const { startDate: lastLoginStartDate, endDate: lastLoginEndDate } = lastLoginDate;
  
    query.createdStartDate = createdStartDate;
    query.createdEndDate = createdEndDate;
    query.lastLoginStartDate = lastLoginStartDate;
    query.lastLoginEndDate = lastLoginEndDate;
    query.nickname = nickname;
    // query.type = types;
    mutate();
  }

  if (isLoading || !data) return null;
  if (error) return;

  return (
    <UserPageView
      query={query}
      count={data.data.count}
      userData={data.data.data}
      handleSearch={handleSearch}
    />
  )
}
export default UserPage
