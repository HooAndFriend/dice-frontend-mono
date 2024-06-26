// ** Reacat Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Type Imports
import { SocialSignupParams } from "@/src/type/auth";

interface PropsType {
  signupUser: SocialSignupParams;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleJoin: () => void;
  handleCancel: () => void;
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SocialSignupContainerView = ({
  handleInput,
  signupUser,
  handleJoin,
  handleCancel,
  handleEnter,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[660px] h-[495px] rounded-[20px] shadow-md">
        <div className="flex justify-center text-[40px] font-san-bold mt-[80px]">
          Signup
        </div>
        <div>
          <div className="flex mt-[60px] w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="NickName"
              className="text-[16px] text-black font-san-medium mr-[32px]"
            >
              NickName
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              id="NickName"
              className="border h-[50px] w-[420px] text-gray-900 text-base p-[15px] rounded-[10px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your NickName"
              name="nickname"
              value={signupUser.nickname}
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex mt-[30px] w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="NickName"
              className="text-base font-san-medium text-black text-[16px] mr-[65px]"
            >
              Email
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              id="NickName"
              className="font-normal font-spoqa border h-[50px] w-[420px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your NickName"
              name="email"
              value={signupUser.email}
              onChange={handleInput}
              onKeyDown={handleEnter}
              required
            />
          </div>
          <div className="w-[540px] h-[55px] flex m-auto mt-[50px] justify-between">
            <button
              className="h-full w-[257px] bg-[#EBEBEC] rounded-[15px] text-white text-[18px] font-san-bold"
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              className="h-full w-[257px] bg-main rounded-[15px] text-white text-[18px] font-san-bold"
              onClick={handleJoin}
            >
              JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignupContainerView;
