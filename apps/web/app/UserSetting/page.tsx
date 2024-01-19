import Image from 'next/image';

export default function UserSetting(): JSX.Element {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[1192px] h-[769px] rounded-2xl shadow-md">
        <div className="mt-[45px] ml-[60px] w-[1072px] h-[38px] flex justify-between">
          <div className="font-mosk font-bold text-[32px]">User Setting</div>
          <div>
            <Image alt="X" src="/XButton.svg" width={32} height={32} />
          </div>
        </div>
        <div className="flex w-[1072px] h-[601px] ml-[60px] mt-10 justify-between">
          <div className="bg-main w-[274px] h-[601px] rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
            <img
              src="/dice.png"
              alt="Sample Image"
              className="w-[91px] h-[91px] object-cover rounded-full mt-[52px]"
            />

            <div className="mt-[21px] font-spoqa font-bold text-[25px] text-white">
              DICE
            </div>
            <div className="mt-[57px]">
              <div className="mb-px w-[217px] h-[49px] bg-white rounded-full flex items-center text-xl font-bold font-spoqa text-main">
                <Image
                  className="ml-[18px] mr-5"
                  src="/setting.svg"
                  alt="setting"
                  width={24}
                  height={24}
                />
                Setting
              </div>
              <div className="mb-px w-[217px] h-[49px] bg-main rounded-full flex items-center text-xl font-bold font-spoqa text-white">
                <Image
                  className="ml-[18px] mr-5"
                  src="/team.svg"
                  alt="team"
                  width={24}
                  height={24}
                />
                Team
              </div>
              <div className="w-[217px] h-[49px] bg-main rounded-full flex items-center text-xl font-bold font-spoqa text-white">
                <Image
                  className="ml-[18px] mr-5"
                  src="/workspace.svg"
                  alt="workspace"
                  width={24}
                  height={24}
                />
                Workspace
              </div>
            </div>
          </div>
          <div className="w-[742px] h-[601px]">
            <label className="font-spoqa text-xl font-bold">Profile</label>
            <div className="mt-[14px] relative w-[110px] h-[110px]">
              <img
                src="/dice.png"
                alt="Sample Iamge"
                className="w-[104px] h-[104px] rounded-[20px] bg-purple-200 absolute"
              />
              <div className="w-[25px] h-[25px] bg-[#EBEBEC] rounded-[5px] absolute top-[85px] left-[85px] flex justify-center items-center">
                <Image src="/edit.svg" alt="edit" width={15} height={15} />
              </div>
            </div>
            <div className="mt-5">
              <label className="font-spoqa text-xl font-bold">Nickname</label>
              <input
                id="nickname"
                placeholder="Enter Your Nickname"
                className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                defaultValue="DICE"
              />
            </div>
            <div className="mt-5">
              <label className="font-spoqa text-xl font-bold">Email</label>
              <input
                id="email"
                placeholder="Enter Your Email"
                className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                defaultValue="yoonalim2003@gmail.com"
              />
            </div>
            <button className="m-auto mt-[93px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
