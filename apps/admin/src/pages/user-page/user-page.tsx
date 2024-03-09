// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import UserSearchBox from '@/src/components/UserSearchBox'

interface PropsType {}

const UserPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="사용자 관리 / 사용자 조회" text="사용자 조회" />
      <UserSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">사용자 목록(30명)</h1>
        <CustomTable headerData={headerData} bodyData={bodyData} />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
    </div>
  )
}

export default UserPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '닉네임', size: '15%' },
  { name: '이메일', size: '25%' },
  { name: '가입 구분', size: '5%' },
  { name: '가입일', size: '15%' },
  { name: '최근 로그인', size: '15%' },
  { name: '소속 팀 수', size: '10%' },
  { name: '소속 워크스페이스 수', size: '10%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
    { name: '1', size: '10%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
    { name: '1', size: '10%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '김인후', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: 'Google', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
    { name: '1', size: '10%' },
  ],
]
