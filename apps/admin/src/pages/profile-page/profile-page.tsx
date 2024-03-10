// ** Component Imports
import CustomTable from '@/src/components/Table'
import TablePagination from '@/src/components/Table/TablePagination'
import TitleBox from '@/src/components/TitleBox'
import AdminSearchBox from '@/src/components/SearchBox/AdminSearchBox'

interface PropsType {}

const ProfilePageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <div className="h-[730px] w-full bg-white rounded-[10px] mt-4 flex">
        <div className="w-1/5">
          <div className="w-full h-[60px] flex justify-center items-center bg-[#D0C4F3] border-r-[4px] border-solid border-[#623AD6]">
            <h1 className="font-bold text-[20px] text-[#623AD6]">내 정보</h1>
          </div>
          <div className="w-full h-[60px] flex justify-center items-center">
            <h1 className="font-bold text-[20px]">로그아웃</h1>
          </div>
        </div>
        <div className="w-4/5 border-l-2 border-solid border-[#C6C6C6] p-8">
          <h1 className="font-bold text-[21px]">내 정보</h1>
          <div className="flex">
            <div className="w-2/5">
              <h1 className="mt-8 font-bold text-[14px]">이메일</h1>
              <div className="mt-4 w-[370px] h-[40px] rounded-[8px] bg-[#EFEFEF] flex items-center pl-4 text-[#B0ADB7]">
                inhoo987654321@gmail.com
              </div>
              <h1 className="mt-8 font-bold text-[14px]">이메일</h1>
              <button className="mt-4 w-[150px] h-[40px] rounded-[8px] border-2 border-solid border-[#EFEFEF]">
                비밀번호 변경
              </button>
              <br />
              <button className="mt-8 w-[150px] h-[40px] rounded-[8px] bg-[#623AD6] text-white">
                변경사항 저장
              </button>
            </div>
            <div className="w-3/5">
              <h1 className="mt-8 font-bold text-[14px]">사진</h1>
              <div className="mt-4 w-[370px] h-[40px] rounded-[8px] bg-[#EFEFEF] flex items-center pl-4 text-[#B0ADB7]">
                inhoo987654321@gmail.com
              </div>
              <div className="w-[128px] h-[128px] rounded-full bg-[#E6E6E6] mt-8 flex items-center justify-center">
                <img src="/svg/photo.svg" alt="photo" />
              </div>
              <button className="mt-8 w-[150px] h-[40px] rounded-[8px] border-2 border-solid border-[#EFEFEF]">
                사진 업로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageView

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
