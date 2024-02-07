interface PropsType {
  handleOpen: () => void;
}

const MemberContent = ({ handleOpen }: PropsType) => {
  return (
    <div>
      <div className="font-bold text-xl mb-[14px] font-spoqa">
        Invite Member
      </div>
      <div className="w-full flex">
        <input
          className="w-[611px] h-[50px] border border-[#EBEBEC] rounded-[10px] p-[15px] mr-[15px]"
          defaultValue="DICE"
        />
        <button className="w-[120px] h-[50px] text-white font-bold text-base bg-main font-spoqa tracking-[-1px] rounded-[10px]">
          COPY
        </button>
      </div>
      <div className="mt-[31px] flex w-full h-[23px] justify-between mb-[14px]">
        <div className="text-lg font-spoqa font-bold">Member</div>
        <div
          onClick={handleOpen}
          className="flex justify-center items-center font-spoqa font-base font-bold"
        >
          <img
            className="mr-[10px]"
            src="svg/addMember.svg"
            width={24}
            height={24}
          />
          AddMember
        </div>
      </div>
      <div>
        <div className="mb-[21px] w-[746px] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
          <div className="flex">
            <img
              src="/images/dice.png"
              alt="Sample Image"
              width={45}
              height={45}
              className="rounded-full ml-[17px] mr-4 "
            />
            <div className="h-[45px]">
              <div className="font-spoqa text-base">Lim yoona</div>
              <div className="font-spoqa text-base text-[#9A9A9A]">
                yoonalim2003@gmail.com
              </div>
            </div>
          </div>
          <div className="flex mr-[15px]">
            <select
              id="select1"
              className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center"
            >
              <option className="text-base font-spoqa" value="Admin">
                Admin
              </option>
            </select>
            <img src="svg/boldX.svg" width={24} height={24} />
          </div>
        </div>
        <div className="mb-[21px] w-[746px] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
          <div className="flex">
            <img
              src="/images/dice.png"
              alt="Sample Image"
              width={45}
              height={45}
              className="rounded-full ml-[17px] mr-4 "
            />
            <div className="h-[45px]">
              <div className="font-spoqa text-base">Lim yoona</div>
              <div className="font-spoqa text-base text-[#9A9A9A]">
                yoonalim2003@gmail.com
              </div>
            </div>
          </div>
          <div className="flex mr-[15px]">
            <select
              id="select1"
              className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center"
            >
              <option className="text-base font-spoqa" value="Admin">
                Admin
              </option>
            </select>
            <img src="svg/boldX.svg" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberContent;
