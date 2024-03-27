// ** Type Imports
import { ImageUploader } from "@/src/components/ImageUploader";
import { TeamInfo } from "@/src/type/team";

interface PropsType {
  data: TeamInfo;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  handleImage: (profile: string) => void;
}

const SettingContentView = ({
  data,
  handleInput,
  handleUpdate,
  handleImage,
}: PropsType) => {
  return (
    <div>
      <label className="text-xl font-bold font-spoqa">Profile</label>
      <ImageUploader image={data.profile} setPath={handleImage} mode="edit" />
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
