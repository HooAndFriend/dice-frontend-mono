import CustomSelect from '../../CustomInput/CustomSelect'

interface PropsType {
  handleCreateAdmin: () => void
}

const CreateAdminModalView = ({ handleCreateAdmin }: PropsType) => {
  return (
    <div className="w-full h-screen bg-[#00000080] absolute flex justify-center items-center top-0">
      <div className="w-[600px] h-[461px] bg-white rounded-xl">
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
        <div className="w-full flex-row ">
          <div className="flex w-[559px] h-[57px] m-auto">
            <p className="mr-4 font-semibold text-sm">
              이름
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="text"
                placeholder="이름"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px]">이름을 입력해주세요.</p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto">
            <p className="mr-4 font-semibold text-sm">
              이름
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="text"
                placeholder="이름"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px]">이름을 입력해주세요.</p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto">
            <p className="mr-4 font-semibold text-sm">
              이름
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <input
                type="text"
                placeholder="이름"
                className="w-[479px] h-[40px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
              />
              <p className="text-[#EA5C5D] text-[11px]">이름을 입력해주세요.</p>
            </div>
          </div>
          <div className="flex w-[559px] h-[57px] m-auto">
            <p className="mr-4 font-semibold text-sm">
              이름
              <span className="text-sm font-semibold text-[#EA5C5D]">*</span>
            </p>
            <div>
              <CustomSelect option="--권한--" />
              <p className="text-[#EA5C5D] text-[11px]">이름을 입력해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAdminModalView
