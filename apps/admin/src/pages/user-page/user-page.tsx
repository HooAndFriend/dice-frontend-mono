// ** React Imports
import { useRef, useState } from 'react'

// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/SearchBox/UserSearchBox'
import UserModal from '@/src/components/Modal/UserModal'

// ** Type Imports
import { DateRange, UserInfo, UserInfoQuery } from '@/src/type/user'
import { formatDate } from './index'

interface PropsType {
  userData: UserInfo[];
  query: UserInfoQuery;
  count: number;
  handleSearch: (createdDate: DateRange, lastLoginDate: DateRange, nickname: string, types: string[]) => void;
  handlePage: (page: number) => void;
}

const UserPageView = ({
  userData,
  count,
  query,
  handleSearch,
  handlePage
}: PropsType) => {

  const [open, setOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserInfo>()

  const cancelButtonRef = useRef(null)

  const bodyData = userData.map((user, index) => [
    { name: user.id.toString(), size: '0%' },
    { name: (index + 1).toString(), size: '5%' },
    { name: user.nickname, size: '15%' },
    { name: user.email, size: '20%' },
    { name: user.type, size: '10%' },
    { name: formatDate(user.createdDate), size: '15%' },
    { name: formatDate(user.lastLoginDate), size: '15%' },
    { name: user.workspaceUserCount, size: '10%' },
    { name: user.teamUserCount, size: '10%' },
  ])

  const handleOpen = () => setOpen((c) => !c)

  const handleItemClick = (userId: number) => {
    const user = userData.find(user => user.id === userId);
    if (user) {
      setSelectedUser(user)
      handleOpen()
    }
  }

  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 사용자 조회" text="사용자 조회" />
      <UserSearchBox
        searchData={searchData}
        query={query}
        onChange={handleSearch}
      />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">사용자 목록({count})</h1>
        <CustomTable
          headerData={headerData}
          bodyData={bodyData}
          disabledClick={false}
          ids={userData.map(user => user.id)}
          handleClick={handleItemClick}
        />
        <div className="flex justify-end w-full">
          <TablePagination count={count} pageSize={query.pageSize} handlePage={handlePage} />
        </div>
      </div>
      {selectedUser && open && (
        <UserModal
          userInfo={selectedUser}
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  )
}

export default UserPageView

const searchData = ['가입일', '최근 로그인']
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
