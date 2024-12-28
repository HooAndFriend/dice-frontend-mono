// ** Swr Imports
import useSWR, { mutate } from 'swr'
import { GetSearchWorkspaceUserListResponse } from '@/src/type/workspace'
import { CommonResponse } from '@/src/type/common'

export const useGetWorkspaceUser = (name: string) => {
  return useSWR<CommonResponse<GetSearchWorkspaceUserListResponse>>(
    '/v1/workspace-user/search',
  )
}
