// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import WorkspaceSearchBox from '@/src/components/SearchBox/WorkspaceSearchBox'

interface PropsType {}

const WorkspacePageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox
        title="워크스페이스 관리 / 워크스페이스 조회"
        text="워크스페이스 조회"
      />
      <WorkspaceSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">워크스페이스 목록(30명)</h1>
        <CustomTable
          headerData={headerData}
          bodyData={bodyData}
          disabledClick
        />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
    </div>
  )
}

export default WorkspacePageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '워크스페이스명', size: '15%' },
  { name: '생성자 ID', size: '25%' },
  { name: '설명', size: '15%' },
  { name: '생성일', size: '15%' },
  { name: '최근 접속일', size: '15%' },
  { name: '소속 멤버 수', size: '10%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: '다이스의 팀', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: '다이스의 팀', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: 'pino@naver.com', size: '25%' },
    { name: '다이스의 팀', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '1', size: '10%' },
  ],
]
