// ** React Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Type Imports
import { SaveWorkspaceParam } from "@/src/type/workspace";

interface PropsType {
  data: SaveWorkspaceParam;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWorkspaceTeam: () => void;
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SaveWorkspaceContainerView = ({
  data,
  handleInput,
  handleEnter,
  handleWorkspaceTeam,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="-mt-12">
        <div className="flex justify-center w-full">
          <img
            src={data.profile}
            width="192px"
            height="192px"
            alt="team-profile"
            className="border-2 border-[#EBEBEC] rounded-full"
          />
        </div>
        <div className="flex w-full mt-[30px]">
          <div>
            <label
              htmlFor="name"
              className="pb-1 pl-1 text-base font-medium text-black font-spoqa"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="font-normal font-spoqa border h-[50px] w-[330px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Name"
              value={data.name}
              onChange={handleInput}
              name="name"
              onKeyDown={handleEnter}
              required
            />
          </div>
        </div>
        <div className="flex w-full mt-[30px]">
          <div>
            <label
              htmlFor="name"
              className="pb-1 pl-1 text-base font-medium text-black font-spoqa"
            >
              Description
            </label>
            <input
              type="text"
              id="name"
              className="font-normal font-spoqa border h-[50px] w-[330px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Description"
              value={data.comment}
              onChange={handleInput}
              name="comment"
              onKeyDown={handleEnter}
              required
            />
          </div>
        </div>
        <div className="flex w-full mt-[30px]">
          <button
            className="bg-[#623AD6] w-[330px] h-[55px] rounded-2xl text-white"
            onClick={handleWorkspaceTeam}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveWorkspaceContainerView;
