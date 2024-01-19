"use client";

import Image from "next/image";

export default function Page(): JSX.Element {
  const handleLogin = () => {};

  return (
    <div className="flex w-full h-screen items-center justify-center bg-[##EBEBEC] ">
      <div className="bg-white w-2/3 h-2/3 rounded-2xl flex shadow-md">
        <div>
          {/* <Image src="/dice2.png" alt="My Image2" width={19} height={17}/> */}
        </div>
        <div className="w-1/2 h-full  bg-[#F6F8FF] rounded-tl-2xl rounded-bl-2xl flex">
          <div className="ml-10 mt-10">
            <Image src="/dice2.png" alt="leftTop" width={19} height={17} />
          </div>
          <div className="flex items-end justify-end w-22 h-22 ml-20 mb-5">
            <Image src="/dice.png" alt="My Image" width={300} height={300} />
          </div>
        </div>
        <div className="w-1/2 h-full">
          <div className="flex justify-center">
            <div className="w-4/5 mt-12">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email
              </label>
              <input
                type="text"
                id="first_name"
                className="border h-14 border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                placeholder="Enter Your Email"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 mt-6">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Password
              </label>
              <input
                type="text"
                id="first_name"
                className="border h-14 border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                placeholder="Enter Your Password"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 mt-12">
              <button
                className="w-full bg-[#623AD6] text-white rounded-xl h-14 text-base font-bold"
                onClick={handleLogin}
              >
                LOGIN
              </button>
            </div>
          </div>
          <div className="flex justify-end underline text-gray-500 mt-2 mr-12">
            HIDICE Signup
          </div>
          <div className="w-4/5 flex justify-between m-auto mt-10">
            <div className="w-12 h-12 bg-white rounded-full shadow-md">
              <Image
                className="m-auto mt-3"
                src="/Microsoft.png"
                alt="Microsoft"
                width={24}
                height={24}
              />
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md">
              <Image
                className="m-auto mt-3"
                src="/google.png"
                alt="Microsoft"
                width={24}
                height={24}
              />
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md">
              <Image
                className="m-auto mt-3"
                src="/apple.png"
                alt="Microsoft"
                width={24}
                height={24}
              />
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md">
              <Image
                className="m-auto mt-3"
                src="/github.png"
                alt="Microsoft"
                width={24}
                height={24}
              />
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-md">
              <Image
                className="m-auto mt-3"
                src="/twitter.png"
                alt="Microsoft"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
