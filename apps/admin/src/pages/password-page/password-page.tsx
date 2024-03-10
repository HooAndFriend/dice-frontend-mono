// ** Router Imports
import { Link } from 'react-router-dom'

interface PropsType {}

const PasswordPageView = ({}: PropsType) => {
  return (
    <div className="bg-[#F8F8F8] flex items-center justify-center w-full h-screen">
      <div className="w-[520px] h-[300px]">
        <div className="flex justify-center">
          <h1 className="text-[40px] font-bold">비밀번호 재설정 이메일 전송</h1>
        </div>
        <div className="flex justify-center">
          <h1 className="text-[20px] mt-8">
            입력한 이메일로 비밀번호를 재설정 할 수 있는 메일을 보냅니다.
          </h1>
        </div>
        <div className="flex justify-center">
          <div>
            <h1 className="text-[14px] mt-8">이메일</h1>
            <input
              className="w-[400px] mt-2 h-[40px] rounded-[8px] pl-2"
              placeholder="이메일"
            />
          </div>
        </div>
        <div className="flex justify-between px-[64px] mt-4">
          <Link to="/">
            <button className="w-[190px] h-[40px] bg-white rounded-md border-2 border-solid border-[#E6E6E6]">
              로그인으로 이동
            </button>
          </Link>
          <button className="w-[190px] h-[40px] bg-[#623AD6] text-white rounded-md">
            이메일 전송
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordPageView
