// ** Reacat Imports
import { ChangeEvent, KeyboardEvent } from "react";

// ** Type Imports
import { DiceLoginParma, SocialType } from "@/src/type/auth";
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
      <div className="bg-white w-[900px] h-[613px] flex shadow-md rounded-[20px]">
        <div className="w-[449px] h-full  bg-[#F6F8FF] flex">
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
        <div className="flex justify-center w-[451px] h-full">
          <div className="w-[330px] h-[409px]">
            <div className="flex justify-center mt-[102px]">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-[14px] text-base font-medium text-gray-900 dark:text-black text-[16px] line-height-[24px]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="border h-[50px] text-[16px] text-gray-900 text-base p-[15px] rounded-[10px] block w-full border-[#EBEBEC] placeholder-[#DDDDDD] dark:text-black bg-white"
                  placeholder="Enter Your Email"
                  onChange={handleInput}
                  name="email"
                  value={loginUser.email}
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full mt-[20px]">
                <label
                  htmlFor="password"
                  className="block mb-[14px] text-base font-medium text-gray-900 dark:text-black text-[16px] line-height-[24px]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border h-[50px] text-[16px] text-gray-900 text-base p-[15px] rounded-[10px] block w-full border-[#EBEBEC] placeholder-[#DDDDDD] dark:text-black bg-white"
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
                  className="w-full bg-main text-white rounded-[15px] h-[55px] text-[18px] font-san-bold"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
                <div
                  className="flex justify-end text-[14px] underline w-full text-[#676767] mt-[15px] cursor-pointer"
                  onClick={handleSignup}
                >
                  HIDICE Signup
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between m-auto mt-[46px]">
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
                onClick={() => handleSocialLogin("GITHUB")}
              >
                <CustomImage
                  src="/images/github.png"
                  alt="github"
                  width={28}
                  height={28}
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
