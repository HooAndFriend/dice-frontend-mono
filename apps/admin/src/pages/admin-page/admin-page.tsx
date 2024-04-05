// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import AdminSearchBox from '@/src/components/SearchBox/AdminSearchBox'

// ** Type Imports
import { AdminInfo } from '@/src/type/admin'
import { TableItemType } from '@/src/type/component'

interface PropsType {
  data: AdminInfo[]
  formatDate: (date: string) => string
}

const AdminPageView = ({ data, formatDate }: PropsType) => {
  console.log(data)

  const bodyData: TableItemType[][] = data.map((element, index) => [
    { name: (index + 1).toString(), size: '5%' },
    { name: element.role, size: '15%' },
    { name: element.nickname, size: '15%' },
    { name: element.email, size: '20%' },
    { name: element.phone, size: '15%' },
    { name: formatDate(element.createdDate), size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ])
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="고객센터 관리 / 관리자 목록" text="관리자 목록" />
      <AdminSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 font-bold">관리자 목록(30명)</h1>
          <div>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white">
              관리자 등록
            </button>
          </div>
        </div>
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

export default AdminPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '권한', size: '15%' },
  { name: '이름', size: '15%' },
  { name: '이메일', size: '20%' },
  { name: '연락처', size: '15%' },
  { name: '등록일', size: '15%' },
  { name: '수정일', size: '15%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: '시스템 관리자', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '20%' },
    { name: '010-6305-7848', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '시스템 관리자', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '20%' },
    { name: '010-6305-7848', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '시스템 관리자', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '20%' },
    { name: '010-6305-7848', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
]
