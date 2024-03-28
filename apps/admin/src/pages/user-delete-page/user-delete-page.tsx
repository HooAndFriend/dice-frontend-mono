// ** React Imports
import { useRef, useState } from 'react'

// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/SearchBox/UserSearchBox'
import UserDeleteModal from '@/src/components/Modal/UserDeleteModal'

// ** Type Imports
import { DeleteUserInfo, DeleteUserQuery } from '@/src/type/user-delete'
import { DateRange } from '@/src/type/user'
import { formatDate } from '@/src/pages/user-page';

interface PropsType {
  userData: DeleteUserInfo[]
  query: DeleteUserQuery
  count: number
  handleSearch: (createdDate: DateRange, lastLoginDate: DateRange, nickname: string, types: string[]) => void;

}

const UserDeletePageView = ({ userData, count, query, handleSearch }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const cancelButtonRef = useRef(null)

  const bodyData = userData.map((user, index) => [
    { name: user.id.toString(), size: '0%' },
    { name: (index + 1).toString(), size: '5%' },
    { name: user.nickname, size: '20%' },
    { name: user.email, size: '20%' },
    { name: user.type, size: '15%' },
    { name: formatDate(user.createdDate), size: '20%' },
    { name: formatDate(user.createdDate), size: '20%' },
  ])
  console.log(userData);

  const handleOpen = () => setOpen((c) => !c)

  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 탈퇴회원 조회" text="탈퇴회원 조회" />
      <UserSearchBox searchDate={searchDate} query={query} onChange={handleSearch} />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">탈퇴회원 목록(30명)</h1>
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
        <UserDeleteModal
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  )
}

export default UserDeletePageView

const searchDate = ["가입일", "탈퇴일"]


const headerData = [
  { name: '번호', size: '5%' },
  { name: '닉네임', size: '20%' },
  { name: '이메일', size: '20%' },
  { name: '가입 구분', size: '15%' },
  { name: '가입일', size: '20%' },
  { name: '탈퇴일', size: '20%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '20%' },
    { name: 'pino@naver.com', size: '30%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '20%' },
    { name: 'pino@naver.com', size: '30%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '20%' },
    { name: 'pino@naver.com', size: '30%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '20%' },
  ],
]
