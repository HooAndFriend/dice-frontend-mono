// ** Reacat Imports
import { ChangeEvent } from "react";

// ** Type Imports
import { DiceSignupParams } from "@/type/auth";

interface PropsType {
  signupUser: DiceSignupParams;
  passwordCheck: string;
  handlePasswordCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleJoin: () => void;
  handleCancel: () => void;
}

const SignupContainerView = ({
  signupUser,
  passwordCheck,
  handlePasswordCheck,
  handleInput,
  handleJoin,
  handleCancel,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[660px] h-[565px] rounded-2xl shadow-md">
        <div className="flex justify-center font-spoqa text-[40px] font-bold mt-20">
          Signup
        </div>
        <div>
          <div className="flex mt-[60px] w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="first_name"
              className="text-base font-medium text-black font-spoqa mr-[65px]"
            >
              Email
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              id="Email"
              className="font-normal font-spoqa border h-[50px] w-[420px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
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
              className="text-base font-medium text-black font-spoqa mr-[37px]"
            >
              Password
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="password"
              className="font-normal font-spoqa border h-[50px] w-[200px] mr-5 text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Password"
              value={signupUser.password}
              onChange={handleInput}
              name="password"
              required
            />
            <input
              type="password"
              className="font-normal font-spoqa border h-[50px] w-[200px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your Password"
              value={passwordCheck}
              onChange={handlePasswordCheck}
              required
            />
          </div>
          <div className="flex mt-5 w-[540px] h-[50px] items-center m-auto">
            <label
              htmlFor="NickName"
              className="text-base font-medium text-black font-spoqa mr-[32px]"
            >
              NickName
              <span className="ml-1 text-base font-medium text-[#F45050] font-spoqa">
                *
              </span>
            </label>
            <input
              type="text"
              className="font-normal font-spoqa border h-[50px] w-[420px] text-gray-900 text-base p-4 rounded-lg block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
              placeholder="Enter Your NickName"
              value={signupUser.nickname}
              onChange={handleInput}
              name="nickname"
              required
            />
          </div>
          <div className="w-[540px] h-[55px] flex m-auto mt-[50px] justify-between">
            <button
              className="h-full w-[257px] bg-[#EBEBEC] rounded-[15px] text-white font-spoqa font-bold"
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              className="h-full w-[257px] bg-main rounded-[15px] text-white font-spoqa font-bold"
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
