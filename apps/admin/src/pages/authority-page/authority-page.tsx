// ** Component Imports
import TitleBox from '@/src/components/TitleBox'
import AdminSearchBox from '@/src/components/SearchBox/AdminSearchBox'

interface PropsType {}

const AuthorityPageView = ({}: PropsType) => {
  return (
    <div className="w-full px-4 mt-4">
      <TitleBox title="고객센터 관리 / 권한 관리" text="권한 관리" />
      <AdminSearchBox />
      <div className="h-[730px] mb-8 w-full bg-white rounded-[10px] py-4 px-8 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-8 font-bold">권한 목록(30명)</h1>
          <div className="flex items-center">
            <h1>최근 변경 : 홍길동 2024-01-01 12:32:13</h1>
            <button className="w-[160px] h-[36px] bg-[#623AD6] rounded-[8px] text-white ml-8">
              변경 사항 저장
            </button>
          </div>
        </div>
        <div className="w-full bg-[#F6F6F6] flex items-center h-[45px] rounded-tl-log rounded-tr-lg">
          <div className="w-[20%] pl-4 justify-center flex">분류</div>
          <div className="w-[20%] pl-4 justify-center flex">사용자 권한</div>
          <div className="w-[20%] pl-4 justify-center flex">시스템 관리자</div>
          <div className="w-[20%] pl-4 justify-center flex">서비스 관리자</div>
          <div className="w-[20%] pl-4 justify-center flex">일반 관리자</div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">대시보드</div>
          <div className="w-[20%] pl-4 justify-center flex">대시보드</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">사용자 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">사용자 조회</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">사용자 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">탈퇴 회원 조회</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">팀 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">팀 조회</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">
            워크스페이스 관리
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            워크스페이스 조회
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">고객센터 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">1:1 문의 조회</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">고객센터 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">자주 묻는 질문</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">운영 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">
            프로그램 버전 등록
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">운영 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">상태값 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
        <div className="w-full flex items-center h-[60px]">
          <div className="w-[20%] pl-4 justify-center flex">운영 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">관리자 관리</div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
          <div className="w-[20%] pl-4 justify-center flex">
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorityPageView
