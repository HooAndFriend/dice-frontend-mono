// ** React Imports
import { useRef, useState } from 'react'

// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/SearchBox/UserSearchBox'
import UserModal from '@/src/components/Modal/UserModal'
import { UserInfo, UserInfoQuery } from '@/src/type/user'

interface PropsType {
  userData: UserInfo[];
  handleSearch: (createdDate: any, lastLoginDate: any, nickname: string, types: string[]) => void;
  query: UserInfoQuery;
  count: number;
}

function formatDate(date: Date): string {
  const d = new Date(date);
  d.setHours(d.getHours() + 9);
  return new Date(d).toISOString().replace('T', ' ').substring(0, 19);
}

const UserPageView = ({userData,count,query, handleSearch}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const cancelButtonRef = useRef(null)
  
  const bodyData = userData.map((user, index) => [
  { name: (index + 1).toString(), size: '5%' },
  { name: user.user_nickname, size: '15%' },
  { name: user.user_email, size: '20%' },
  { name: user.user_type, size: '10%' },
  { name: formatDate(user.user_created_date), size: '15%' },
  { name: formatDate(user.user_last_login_date), size: '15%' },
  { name: user.workspaceUserCount, size: '10%' },
  { name: user.teamUserCount, size: '10%' }
]);

  const handleOpen = () => setOpen((c) => !c)
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 사용자 조회" text="사용자 조회" />
      <UserSearchBox query={query} onChange={handleSearch} />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">사용자 목록({count})</h1>
        <CustomTable
          headerData={headerData}
          bodyData={bodyData}
          disabledClick={false}
          handleClick={handleOpen}
        />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
      {open && (
        <UserModal
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  )
}

export default UserPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '닉네임', size: '15%' },
  { name: '이메일', size: '20%' },
  { name: '가입 구분', size: '10%' },
  { name: '가입일', size: '15%' },
  { name: '최근 로그인', size: '15%' },
  { name: '소속 팀 수', size: '10%' },
  { name: '소속 워크스페이스 수', size: '10%' },
]

