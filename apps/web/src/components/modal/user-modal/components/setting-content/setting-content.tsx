import { ImageUploader } from "@/src/components/ImageUploader";
import { UserInfo } from "@/src/type/user";

interface PropsType {
  data: UserInfo;
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
      <ImageUploader mode="edit" image={data.profile} setPath={handleImage} />
      <div className="mt-5">
        <label className="text-base font-bold font-spoqa">Nickname</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.nickname}
          name="nickname"
          onChange={handleInput}
        />
      </div>
      <div className="mt-5">
        <label className="text-base font-bold font-spoqa">Email</label>
        <input
          id="email"
          placeholder="Enter Your Email"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.email}
          name="email"
          onChange={handleInput}
        />
      </div>
      <button
        className="m-auto mt-[93px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default SettingContentView;
