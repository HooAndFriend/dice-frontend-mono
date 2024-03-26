import { UserInfo, GetUserTeamResponse, GetUserWorkspaceResponse } from '@/src/type/user';
import UserModalView from './UserModal'
import { DialogProvider } from '@/src/context/DialogContext'
import { useRecoilValue } from 'recoil';
import useInput from '@/src/hooks/useInput';
import { AuthState } from '@/src/app/auth';
import useSWR from 'swr';
import { Get } from '@/src/repository';

interface PropsType {
  open: boolean;
  userInfo: UserInfo;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
}

const UserModal = ({ open, setOpen, userInfo, cancelButtonRef }: PropsType) : JSX.Element | null => {
  const { accessToken } = useRecoilValue(AuthState);
  const userId = userInfo?.user_id;
  
  const { data:team, isLoading:teamLoading, error:teamError } = useSWR(`/v1/user/team/${userId}`, async (url) => {
    return Get<GetUserTeamResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
  const { data:workspace, isLoading:wsLoading, error:wsError } = useSWR(`/v1/user/workspace/${userId}`, async (url) => {
    return Get<GetUserWorkspaceResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  if (!team || !workspace) return null;
  if (teamLoading || wsLoading) return null;
  if (teamError || wsError) return null;


  return (
    <DialogProvider>
      <UserModalView
        userData={userInfo}
        teamData={team.data.data}
        workspaceData={workspace.data.data}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />
    </DialogProvider>
  )
}

export default UserModal
