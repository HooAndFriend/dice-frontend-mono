import { LoginParam } from '@/src/type/auth'
import { Link } from 'react-router-dom'

interface PropsType {
  data: LoginParam
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleLogin: () => void
}

const LoginPageView = ({
  data,
  handleInput,
  handleLogin,
  handleEnter,
}: PropsType) => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F8F8F8]">
      <div className="w-[310px] h-[400px] flex justify-center">
        <div className="w-full h-full">
          <div className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="logo"
              width="310px"
              height="70px"
            />
          </div>
          <div className="flex justify-center w-full mt-4">
            <div className="mt-4 w-[300px] h-[40px] rounded-md border-[#EFEFEF] border-2 flex items-center justify-center bg-white p-2">
              <img
                src="/images/email.png"
                alt="logo"
                width="18px"
                height="18px"
              />
              <input
                className="w-[280px] h-full pl-3"
                placeholder="이메일"
                value={data.email}
                name="email"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="mt-4 w-[300px] h-[40px] rounded-md border-[#EFEFEF] border-2 flex items-center bg-white p-2">
              <img
                src="/images/password.png"
                alt="logo"
                width="18px"
                height="18px"
              />
              <input
                className="w-[280px] h-full pl-3"
                placeholder="비밀번호"
                value={data.password}
                name="password"
                type="password"
                onChange={handleInput}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <div className="flex justify-end w-full mt-6">
            <Link to="/password">
              <h4 className="text-[#623AD6] pr-3">비밀번호 재설정</h4>
            </Link>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="w-[300px] h-[40px] text-white bg-[#623AD6] rounded-md mt-4"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPageView
