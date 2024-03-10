// ** Utils Imports
import DonutChart from '@/src/components/Chart/DounetChart'
import LineChart from '@/src/components/Chart/LineChart'
import NumberBox from '@/src/components/NumberBox'
import CustomTable from '@/src/components/Table'
import dayjs from 'dayjs'

interface PropsType {}

const DashboardPageView = ({}: PropsType) => {
  return (
    <div className="p-4">
      <div className="flex items-end">
        <h1 className="font-bold text-[24px]">오늘의 운영 현황</h1>
        <p className="text-[#656565] text-[14px] ml-4">
          Today Date {dayjs().format('YYYY-MM-DD')}
        </p>
      </div>
      <div className="flex w-full mt-[20px]">
        <NumberBox title="신규 가입자 수" value={37} />
        <NumberBox title="신규 워크스페이스 수" value={100} />
        <NumberBox title="신규 팀 수" value={107} />
        <NumberBox title="누적 다운로드 수" value={200} />
      </div>
      <div className="flex w-full mt-[20px]">
        <div className="h-[400px] w-3/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">다운로드 데이터</h1>
          <LineChart
            categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            seriesData={[30, 40, 45, 50, 49, 60]}
          />
        </div>
        <div className="h-[400px] w-1/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">오늘의 접속률</h1>
          <div className="flex items-center justify-center mt-[50px]">
            <DonutChart value={34} />
          </div>
        </div>
      </div>
      <div className="flex w-full mt-[20px]">
        <div className="h-[400px] w-2/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">회원 현황</h1>
          <LineChart
            categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            seriesData={[30, 40, 45, 50, 49, 60]}
          />
        </div>
        <div className="h-[400px] w-2/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">일자별 요약</h1>
          <CustomTable headerData={headerData} bodyData={bodyData} />
        </div>
      </div>
      <div className="flex w-full mt-[20px]">
        <div className="h-[400px] w-2/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">
            신규 등록 워크스페이스 (3건)
          </h1>
          <CustomTable headerData={headerData} bodyData={bodyData} />
        </div>
        <div className="h-[400px] w-2/4 bg-white rounded-[10px] p-4 mx-4">
          <h1 className="text-[19px] font-bold">미답변 1:1 문의 (4명)</h1>
          <CustomTable headerData={headerData} bodyData={bodyData} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPageView

const headerData = [
  { name: '일자', size: '40%' },
  { name: '다운로드 수', size: '20%' },
  { name: '팀 등록 수', size: '20%' },
  { name: '워크스페이스 등록 수', size: '20%' },
  { name: '티켓 등록 수', size: '20%' },
]

const bodyData = [
  [
    { name: '2024-01-01 23:10:12', size: '40%' },
    { name: '30', size: '15%' },
    { name: '55', size: '15%' },
    { name: '23', size: '15%' },
    { name: '35', size: '15%' },
  ],
  [
    { name: '2024-01-01 23:10:12', size: '40%' },
    { name: '30', size: '15%' },
    { name: '55', size: '15%' },
    { name: '23', size: '15%' },
    { name: '35', size: '15%' },
  ],
  [
    { name: '2024-01-01 23:10:12', size: '40%' },
    { name: '30', size: '15%' },
    { name: '55', size: '15%' },
    { name: '23', size: '15%' },
    { name: '35', size: '15%' },
  ],
]
