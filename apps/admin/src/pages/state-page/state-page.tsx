// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import AdminSearchBox from '@/src/components/SearchBox/AdminSearchBox'
import StateBox from '@/src/components/StateBox'

interface PropsType {}

const StatePageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="고객센터 관리 / 상태값 관리" text="상태값 관리" />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 font-bold">상태값 목록(4건)</h1>
          <div>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white">
              상태값 등록
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <StateBox
            title="완료"
            isExpose={true}
            color="#ffffff"
            memo="완료 상태 값"
          />
          <StateBox
            title="완료"
            isExpose={true}
            color="#ffffff"
            memo="완료 상태 값"
          />
        </div>
      </div>
    </div>
  )
}

export default StatePageView

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
