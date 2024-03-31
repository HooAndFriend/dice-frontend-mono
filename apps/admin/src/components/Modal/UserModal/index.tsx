// ** UI Imports
import UserModalView from './UserModal'

// ** Context Imports
import { DialogProvider } from '@/src/context/DialogContext'
// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { AuthState } from '@/src/app/auth'

// ** Swr Imports
import useSWR from 'swr'
import { Get } from '@/src/repository'

// ** Type Imports
import {
  UserInfo,
  GetUserTeamResponse,
  GetUserWorkspaceResponse,
} from '@/src/type/user'
interface PropsType {
  open: boolean
  userInfo: UserInfo
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserModal = ({
  open,
  setOpen,
  userInfo,
  cancelButtonRef,
}: PropsType): JSX.Element | null => {
  const { accessToken } = useRecoilValue(AuthState)
  const userId = userInfo?.user_id

  const {
    data: team,
    isLoading: teamLoading,
    error: teamError,
  } = useSWR(`/v1/user/team/${userId}`, async (url) => {
    return Get<GetUserTeamResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
  const {
    data: workspace,
    isLoading: wsLoading,
    error: wsError,
  } = useSWR(`/v1/user/workspace/${userId}`, async (url) => {
    return Get<GetUserWorkspaceResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })

  if (!team || !workspace) return null
  if (teamLoading || wsLoading) return null
  if (teamError || wsError) return null

  return (
    <DialogProvider>
      <UserModalView
        userData={userInfo}
        teamCount={team.data.count}
        teamData={team.data.data}
        workspaceCount={workspace.data.count}
        workspaceData={workspace.data.data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default UserModal
