// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import FaqSearchBox from '@/src/components/SearchBox/FaqSearchBox'

interface PropsType {}

const FaqPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox
        title="고객센터 관리 / 자주 묻는 질문 조회"
        text="자주 묻는 질문 조회"
      />
      <FaqSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 font-bold">자주 묻는 질문 목록(30명)</h1>
          <div>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white mr-8">
              카테고리 관리
            </button>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white">
              자주 묻는 질문 등록
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

export default FaqPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '카테고리', size: '15%' },
  { name: '제목', size: '15%' },
  { name: '이름', size: '15%' },
  { name: '이메일', size: '15%' },
  { name: '등록일', size: '15%' },
  { name: '답변 여부', size: '5%' },
  { name: '답변일', size: '15%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: '문의 드립니다!', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '답변 대기', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: '문의 드립니다!', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '답변 대기', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: '다이스', size: '15%' },
    { name: '문의 드립니다!', size: '15%' },
    { name: '이가인', size: '15%' },
    { name: 'pino@naver.com', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '답변 대기', size: '5%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
]
