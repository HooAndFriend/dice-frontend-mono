import Image from "next/image";

interface PropsType {}

const CreateWorkspaceContainerView = ({}: PropsType) => {
  return (
    <div className="w-full h-screen bg-[#FAFAFB] flex items-center justify-center font-spoqa">
      <div className="w-[330px] h-[513px]">
        <Image
          className="m-auto"
          src="/images/workspaceLogo.png"
          alt="workspaceLogo"
          width={192}
          height={192}
        />
        <div className="mt-[40px]">
          <label className="font-medium">name</label>
          <input
            className="w-full h-[50px] rounded-[10px] border border-[#EBEBEC] placeholder-[#DDDDDD] p-4 mt-[14px]"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mt-5">
          <label className="font-medium">description</label>
          <input
            className="w-full h-[50px] rounded-[10px] border border-[#EBEBEC] placeholder-[#DDDDDD] p-4 mt-[14px]"
            placeholder="Enter Your description"
          />
        </div>
        <button className="w-full h-[55px] bg-main rounded-[15px] text-white text-lg font-bold mt-[30px]">
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateWorkspaceContainerView;
