// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import QnaSearchBox from '@/src/components/SearchBox/QnaSearchBox'

interface PropsType {}

const QnaPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="고객센터 관리 / 1:1 문의 조회" text="1:1 문의 조회" />
      <QnaSearchBox />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <h1 className="mb-8 font-bold">문의 목록(30명)</h1>
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

export default QnaPageView

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
