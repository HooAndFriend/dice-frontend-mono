import { ChangeEvent } from 'react'

interface PropsType {
  handleCreateAdmin: () => void
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  addAdmin: () => void
}

const CreateAdminModalView = ({
  handleCreateAdmin,
  handleInput,
  addAdmin,
  handleSelect,
}: PropsType) => {
  return (
    <div className="w-full h-screen bg-[#00000080] absolute flex justify-center items-center top-0">
      <div className="w-[600px] h-[550px] bg-white rounded-xl">
        <div className="bg-[#623AD6] w-full h-[56px] flex justify-between rounded-t-xl items-center">
          <div className="text-white font-bold text-base ml-4">관리자 등록</div>
          <img
            onClick={handleCreateAdmin}
            className="mr-4"
            src="/svg/close.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="w-full flex-row">
          <div className="flex w-[559px] h-[57px] m-auto mt-5">
            <p className="w-[76px] h-5 mt-[10px] mr-4 font-semibold text-sm">
              이름
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div className="h-full">
              <input
                type="text"
                placeholder="이름 입력"
                name="nickname"
                onChange={handleInput}
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px] mt-2">
                이름을 입력해주세요.
              </p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto mt-6">
            <p className="w-[76px] h-5 mt-[10px] mr-4 font-semibold text-sm">
              이메일
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="text"
                onChange={handleInput}
                placeholder="이메일 입력"
                name="email"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px] mt-2">
                이메일을 입력해주세요.
              </p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto mt-6">
            <p className="w-[76px] h-5 mt-[10px] mr-4 font-semibold text-sm">
              패스워드
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="text"
                onChange={handleInput}
                placeholder="패스워드 입력"
                name="password"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px] mt-2">
                패스워드를 입력해주세요.
              </p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto  mt-6">
            <p className="w-[76px] h-5 mt-[10px] mr-4 font-semibold text-sm">
              연락처
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="number"
                onChange={handleInput}
                placeholder="연락처 입력"
                name="phone"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px] mt-2">
                연락처를 입력해주세요.
              </p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto mt-6">
            <p className="w-[76px] h-5 mt-[10px] mr-4 font-semibold text-sm">
              권한
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <select
                onChange={handleSelect}
                name="role"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              >
                <option value="" disabled selected>
                  --권한선택--
                </option>
                <option value="MASTER">시스템 관리자</option>
                <option value="BASIC">일반 관리자</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="flex justify-between px-5 pt-5">
            <button
              onClick={handleCreateAdmin}
              type="reset"
              className="w-[58px] h-10 bg-[#EFEFEF] text-[#696374] rounded-lg flex justify-center items-center font-semibold"
            >
              취소
            </button>
            <div
              onClick={addAdmin}
              className="w-[58px] h-10 bg-[#623AD6] text-white rounded-lg  flex justify-center items-center font-semibold"
            >
              등록
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAdminModalView
