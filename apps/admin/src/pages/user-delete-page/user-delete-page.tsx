// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/SearchBox/UserSearchBox'

interface PropsType {}

const UserDeletePageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 탈퇴회원 조회" text="탈퇴회원 조회" />
      <UserSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">탈퇴회원 목록(30명)</h1>
        <CustomTable headerData={headerData} bodyData={bodyData} />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
    </div>
  )
}

export default UserDeletePageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '닉네임', size: '20%' },
  { name: '이메일', size: '30%' },
  { name: '가입 구분', size: '5%' },
  { name: '가입일', size: '20%' },
  { name: '최근 로그인', size: '20%' },
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
