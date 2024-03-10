// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'

interface PropsType {}

const ProgramPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="운영 관리 / 프로그램 버전" text="프로그램 버전" />
      <div className="h-[730px] w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 font-bold">프로그램 버전 목록(30건)</h1>
          <div>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white">
              버전 등록
            </button>
          </div>
        </div>
        <CustomTable headerData={headerData} bodyData={bodyData} />
        <div className="flex justify-end w-full">
          <TablePagination />
        </div>
      </div>
    </div>
  )
}

export default ProgramPageView

const headerData = [
  { name: '번호', size: '5%' },
  { name: '구분', size: '15%' },
  { name: '버전명', size: '15%' },
  { name: '메모', size: '20%' },
  { name: '관리자', size: '15%' },
  { name: '등록일', size: '15%' },
  { name: '최근 수정일', size: '15%' },
]

const bodyData = [
  [
    { name: '1', size: '5%' },
    { name: 'Apple', size: '15%' },
    { name: '1.0 Version', size: '15%' },
    { name: '최초 버전 업로드', size: '20%' },
    { name: '이가인', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: 'Apple', size: '15%' },
    { name: '1.0 Version', size: '15%' },
    { name: '최초 버전 업로드', size: '20%' },
    { name: '이가인', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
  [
    { name: '1', size: '5%' },
    { name: 'Window', size: '15%' },
    { name: '1.0 Version', size: '15%' },
    { name: '최초 버전 업로드', size: '20%' },
    { name: '이가인', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
    { name: '2024-01-01 23:10:12', size: '15%' },
  ],
]
