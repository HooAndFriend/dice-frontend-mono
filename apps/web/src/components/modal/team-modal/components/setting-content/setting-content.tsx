// ** Type Imports
import { TeamInfo } from "@/src/type/team";

interface PropsType {
  data: TeamInfo;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
}

const SettingContentView = ({ data, handleInput, handleUpdate }: PropsType) => {
  return (
    <div>
      <label className="text-xl font-bold font-spoqa">Profile</label>
      <div className="mt-[14px] relative w-[110px] h-[110px]">
        <img
          src={data.profile}
          alt="Sample Iamge"
          className="w-[104px] h-[104px] rounded-[20px] bg-purple-200 absolute"
        />
        <div className="w-[25px] h-[25px] bg-[#EBEBEC] rounded-[5px] absolute top-[85px] left-[85px] flex justify-center items-center">
          <img src="/svg/edit.svg" alt="edit" width={15} height={15} />
        </div>
      </div>
      <div className="mt-5">
        <label className="text-base font-bold font-spoqa">Team Name</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.name}
          onChange={handleInput}
          name="name"
        />
      </div>
      <div className="mt-[30px]">
        <label className="text-base font-bold font-spoqa">description</label>
        <input
          id="description"
          className="mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.description}
          onChange={handleInput}
          name="description"
        />
      </div>
      <button
        className="m-auto mt-[40px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default SettingContentView;
