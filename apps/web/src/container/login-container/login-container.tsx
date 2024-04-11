// ** Reacat Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Type Imports
import { DiceLoginParma, SocialType } from "@/src/type/auth";
import Image from "next/image";
import CustomImage from "@/src/components/Image/CustomImage";

interface PropsType {
  loginUser: DiceLoginParma;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  handleSignup: () => void;
  handleSocialLogin: (type: SocialType) => void;
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const LoginContainerView = ({
  loginUser,
  handleInput,
  handleLogin,
  handleSocialLogin,
  handleSignup,
  handleEnter,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[900px] h-[613px] rounded-2xl flex shadow-md">
        <div className="w-1/2 h-full  bg-[#F6F8FF] rounded-tl-2xl rounded-bl-2xl flex">
          <div className="w-[89px] h-[27px] ml-[34px] mt-[45px] flex items-center">
            <CustomImage
              src="/images/dice2.png"
              alt="leftTop"
              width={19}
              height={17}
            />
            <div className="ml-1 text-xl font-medium text-main font-open">
              HIDICE
            </div>
          </div>
          <div className="flex items-end justify-end w-[270px] h-[240px] mt-[332px] ml-[21px]">
            <CustomImage
              src="/images/dice.png"
              alt="My Image"
              width={270}
              height={240}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/2 h-full">
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
                  onKeyDown={handleEnter}
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
            <div
              className="flex justify-end text-sm underline w-full text-[#676767] mt-4 mr-12 font-spoqa font-medium cursor-pointer"
              onClick={handleSignup}
            >
              HIDICE Signup
            </div>
            <div className="w-full flex justify-between m-auto mt-[46px]">
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
                onClick={() => handleSocialLogin("MICROSOFT")}
              >
                <CustomImage
                  src="/images/microsoft.png"
                  alt="Microsoft"
                  width={24}
                  height={24}
                />
              </div>
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
                onClick={() => handleSocialLogin("GOOGLE")}
              >
                <CustomImage
                  src="/images/google.png"
                  alt="google"
                  width={24}
                  height={24}
                />
              </div>
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
                // onClick={() => handleSocialLogin("APPLE")}
              >
                <CustomImage
                  src="/images/apple.png"
                  alt="apple"
                  width={28}
                  height={28}
                />
              </div>
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
                onClick={() => handleSocialLogin("GITHUB")}
              >
                <CustomImage
                  src="/images/github.png"
                  alt="github"
                  width={28}
                  height={28}
                />
              </div>
              <div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer"
                onClick={() => handleSocialLogin("TWITTER")}
              >
                <CustomImage
                  src="/images/twitter.png"
                  alt="twitter"
                  width={24}
                  height={19.83}
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
