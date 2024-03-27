import { ImageUploader } from "@/src/components/ImageUploader";
import { WorkspaceDetailInfo } from "@/src/type/workspace";

interface PropsType {
  data: WorkspaceDetailInfo;
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
      <ImageUploader image={data.profile} mode="edit" setPath={handleImage} />
      <div className="mt-6">
        <label className="text-xl font-bold font-spoqa">Workspace Name</label>
        <input
          id="workspace name"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.name}
          onChange={handleInput}
          name="name"
        />
      </div>
      <div className="mt-[30px]">
        <label className="text-xl font-bold font-spoqa">description</label>
        <input
          id="description"
          className="text-left mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.comment}
          onChange={handleInput}
          name="comment"
        />
      </div>
      <button
        className="m-auto mt-[30px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-spoqa font-bold text-lg"
        // onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default SettingContentView;
