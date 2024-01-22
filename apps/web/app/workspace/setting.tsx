export default function Setting() {
  return (
    <>
      <label className="font-spoqa text-xl font-bold">Profile</label>
      <div className="mt-[14px] relative w-[110px] h-[110px]">
        <img
          src="/dice.png"
          alt="Sample Iamge"
          className="w-[104px] h-[104px] rounded-[20px] bg-purple-200 absolute"
        />
        <div className="w-[25px] h-[25px] bg-[#EBEBEC] rounded-[5px] absolute top-[85px] left-[85px] flex justify-center items-center">
          <img src="/edit.svg" alt="edit" width={15} height={15} />
        </div>
      </div>
      <div className="mt-6">
        <label className="font-spoqa text-xl font-bold">Workspace Name</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          defaultValue="DICE"
        />
      </div>
      <div className="mt-[30px]">
        <label className="font-spoqa text-xl font-bold">description</label>
        <input
          id="email"
          placeholder="Enter Your Email"
          className="text-left mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          defaultValue="yoonalim2003@gmail.com"
        />
      </div>
      <button className="m-auto mt-[30px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg">
        Update
      </button>
    </>
  );
}
