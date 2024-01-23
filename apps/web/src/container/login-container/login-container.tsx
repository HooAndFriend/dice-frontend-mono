// ** Next Imports
import Link from "next/link";

// ** Reacat Imports
import { ChangeEvent } from "react";

// ** Type Imports
import { DiceLoginParma, SocialType } from "@/type/auth";

interface PropsType {
  loginUser: DiceLoginParma;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  handleSocialLogin: (type: SocialType) => void;
}

const LoginContainerView = ({
  loginUser,
  handleInput,
  handleLogin,
  handleSocialLogin,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[900px] h-[613px] rounded-2xl flex shadow-md">
        <div className="w-1/2 h-full  bg-[#F6F8FF] rounded-tl-2xl rounded-bl-2xl flex">
          <div className="w-[89px] h-[27px] ml-[34px] mt-[45px] flex items-center">
            <img src="/images/dice2.png" alt="leftTop" width={19} height={17} />
            <div className="text-main font-open font-medium text-xl ml-1">
              HIDICE
            </div>
          </div>
          <div className="flex items-end justify-end w-[270px] h-[240px] mt-[332px] ml-[21px]">
            <img
              src="/images/dice.png"
              alt="My Image"
              width={270}
              height={240}
            />
          </div>
        </div>
        <div className="flex w-1/2 h-full justify-center items-center">
          <div className="w-[330px] h-[409px]">
            <div className="flex justify-center">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-[14px] text-base font-medium text-gray-900 dark:text-black font-spoqa"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="font-normal font-spoqa border h-[50px] text-gray-900 text-base p-4 rounded-lg block w-full border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                  placeholder="Enter Your Email"
                  onChange={handleInput}
                  name="email"
                  value={loginUser.email}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full mt-5">
                <label
                  htmlFor="first_name"
                  className="font-spoqa block mb-[14px] text-base font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="first_name"
                  className="font-normal font-spoqa border h-[50px] text-gray-900 text-base p-4 rounded-lg block w-full border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                  placeholder="Enter Your Password"
                  onChange={handleInput}
                  name="password"
                  value={loginUser.password}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full mt-12">
                <button
                  className="w-full bg-main text-white rounded-xl h-[55px] text-lg font-bold font-spoqa"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              </div>
            </div>
            <div className="flex justify-end text-sm underline w-full text-[#676767] mt-4 mr-12 font-spoqa font-medium">
              <Link href="/signup">HIDICE Signup</Link>
            </div>
            <div className="w-full flex justify-between m-auto mt-[46px]">
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                <img
                  src="/images/microsoft.png"
                  alt="Microsoft"
                  width={24}
                  height={24}
                  onClick={() => handleSocialLogin("MICROSOFT")}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                <img
                  src="/images/google.png"
                  alt="google"
                  width={24}
                  height={24}
                  onClick={() => handleSocialLogin("GOOGLE")}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                <img
                  src="/images/apple.png"
                  alt="apple"
                  width={28}
                  height={28}
                  // onClick={() => handleSocialLogin("APPLE")}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                <img
                  src="/images/github.png"
                  alt="github"
                  width={28}
                  height={28}
                  onClick={() => handleSocialLogin("GITHUB")}
                />
              </div>
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md">
                <img
                  src="/images/twitter.png"
                  alt="twitter"
                  width={24}
                  height={19.83}
                  onClick={() => handleSocialLogin("TWITTER")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainerView;
