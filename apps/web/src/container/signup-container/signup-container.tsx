// ** Reacat Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Type Imports
import { DiceSignupParams } from "@/src/type/auth";

interface PropsType {
  signupUser: DiceSignupParams;
  passwordCheck: string;
  handlePasswordCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleJoin: () => void;
  handleCancel: () => void;
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SignupContainerView = ({
  signupUser,
  passwordCheck,
  handlePasswordCheck,
  handleInput,
  handleJoin,
  handleCancel,
  handleEnter,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[660px] h-[565px] rounded-[20px] shadow-md">
        <div className="flex justify-center text-[40px] font-san-bold mt-[80px]">
          Signup
        </div>
        <div>
          <div className="flex mt-[60px] w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="first_name"
              className="text-black mr-[65px] text-[16px] font-san-medium"
            >
              Email
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              id="Email"
              className="border h-[50px] w-[420px] text-gray-900 text-base p-[15px] rounded-[10px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Email"
              value={signupUser.email}
              onChange={handleInput}
              name="email"
              required
            />
          </div>
          <div className="flex mt-5 w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="password"
              className="text-black mr-[37px] text-[16px] font-san-medium"
            >
              Password
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="password"
              className="border h-[50px] w-[200px] mr-[20px] text-gray-900 text-base p-[15px] rounded-[10px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Password"
              value={signupUser.password}
              onChange={handleInput}
              name="password"
              required
            />
            <input
              type="password"
              className="border h-[50px] w-[200px] mr-[20px] text-gray-900 text-base p-[15px] rounded-[10px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Password"
              value={passwordCheck}
              onChange={handlePasswordCheck}
              required
            />
          </div>
          <div className="flex mt-5 w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="NickName"
              className="text-black mr-[37px] text-[16px] font-san-medium"
            >
              NickName
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              className="border h-[50px] w-[420px] text-gray-900 text-base p-[15px] rounded-[10px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your NickName"
              value={signupUser.nickname}
              onChange={handleInput}
              name="nickname"
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

export default SignupContainerView;
