"use client";

import Image from "next/image";

export default function Page(): JSX.Element {
  const handleLogin = () => {};

  return (
    <div className="flex w-full h-screen items-center justify-center bg-black ">
      <div className="bg-white w-2/3 h-2/3 rounded-lg flex">
        <div className="w-1/2 h-full  flex items-center justify-center">
          <Image src="/dice.jpeg" alt="My Image" width={300} height={300} />
          <div className="h-4/5 w-0.5 bg-black" />
        </div>
        <div className="w-1/2 h-full">
          <div className="flex justify-center mt-12 ">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 mt-12">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                ID
              </label>
              <input
                type="text"
                id="first_name"
                className="border h-14 border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                placeholder="John"
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
                placeholder="John"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 mt-12">
              <button
                className="w-full bg-black text-white rounded-lg h-14 text-2xl font-bold"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-4/5 mt-2 flex justify-end">
              <p>Don't have an account?</p>
              <p className="ml-3">Sign up</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
            <div className="w-1/4 bg-slate-600 h-0.5" />
            <p className="px-4">OR LOGIN WITH SOCIAL</p>
            <div className="w-1/4 bg-slate-600 h-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
