export default function AddMember({ isOpen }) {
  return (
    <div
      className={`bg-black bg-opacity-25 w-full h-screen font-spoqa flex justify-center items-center fixed top-0 left-0 z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="w-[617px] h-[171px] rounded-[20px] bg-white pl-[34px] mr-[30px]">
        <div className=" h-[22px] w-full text-xl font-bold mt-[30px] flex justify-between">
          Add Member
          <img className="mr-[30px]" src="svg/XButton.svg" />
        </div>
        <div className="w-full h-[50px] flex mt-[23px]">
          <div className="w-[436px] h-full border border-[#EBEBEC] rounded-[10px] flex pl-4 items-center">
            <div className="bg-[#F4F4FA] w-[86px] h-[29px] rounded-lg flex items-center text-xs mr-[10px]">
              <img
                className="rounded-full ml-2 mr-[2px]"
                src="images/dice.png"
                width={17}
                height={17}
              />
              임유나
              <img
                className="ml-1"
                src="svg/boldX.svg"
                width={18}
                height={18}
              />
            </div>
            <input
              className="focus:outline-none w-[249px]"
              placeholder="Enter Email or nickName"
            />
            <select
              id="select2"
              className="w-[80px] text-[#676767] focus:outline-none"
            >
              <option>Read</option>
            </select>
          </div>
          <button className="bg-main w-[110px] ml-[7px] rounded-[10px] text-white font-bold">
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
