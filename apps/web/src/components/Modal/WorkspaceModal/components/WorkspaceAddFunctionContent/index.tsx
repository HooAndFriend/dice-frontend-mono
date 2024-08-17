// ** Recoil Imports
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

// ** Service Imports
import useSWR from 'swr'
import { Get, Post, Put } from '@/src/repository'

// ** Type Imports
import {
  GetWorkspaceFunctionListResponse,
  WorksapceFunctionType,
} from '@/src/type/workspace'
import useSWRMutation from 'swr/mutation'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'
import { useState } from 'react'
import Image from 'next/image'
import CustomImage from '@/src/components/Image/CustomImage'

const WorkspaceAddFunctionContent = () => {
  const [word, setWord] = useState<string>('')

  const { role } = useRecoilValue(WorkspaceState)

  const { handleOpen } = useDialog()

  const { data, error, isLoading, mutate } = useSWR(
    '/v1/workspace-function/function',
    async (url) => Get<GetWorkspaceFunctionListResponse>(url),
  )

  const removeWorkspaceFunction = useSWRMutation(
    '/v1/workspace-function',
    async (url: string, { arg }: { arg: WorksapceFunctionType }) =>
      await Put<CommonResponse<void>>(url, {
        function: arg,
      }),
    {
      onSuccess: () => {
        mutate()
      },
      onError: (error) => {
        handleOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  const addWorkspaceFunction = useSWRMutation(
    '/v1/workspace-function',
    async (url: string, { arg }: { arg: WorksapceFunctionType }) =>
      await Post<CommonResponse<void>>(url, {
        function: arg,
      }),
    {
      onSuccess: () => {
        mutate()
      },
      onError: (error) => {
        handleOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  if (isLoading) return

  return (
    <div>
      <div className="w-full h-[50px] border border-[#EBEBEC] rounded-[10px] flex justify-between">
        <input
          className="ml-[15px] border-none focus:outline-none w-full"
          placeholder="Search"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <CustomImage
          className="mr-[15px]"
          src="/svg/searchIcon.svg"
          alt="searchIcon"
          width={24}
          height={24}
        />
      </div>
      <div className="w-full mt-[33px]">
        <div className="text-[18px] font-san-bold">Already Have</div>
        <div className="mt-[13px] w-full h-10 flex items-center">
          {data.data.data
            .filter((item) => item.isUse)
            .filter((item) => item.function.includes(word))
            .map((item) => (
              <div
                className="w-[103px] h-10 rounded-[50px] border border-[#EBEBEC] text-base font-spoqa flex items-center pl-[15px] justify-between mr-4"
                key={item.function}
              >
                {item.function}
                {role === 'ADMIN' && (
                  <CustomImage
                    alt="trashcanIcon"
                    className="mr-[13px] cursor-pointer"
                    src="/svg/trashcanIcon.svg"
                    width={15}
                    height={15}
                    onClick={() =>
                      removeWorkspaceFunction.trigger(item.function)
                    }
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="w-[750px] mt-[42px]">
        <div className="text-[18px] font-san-bold">More Functions</div>
        <div className="w-[750px] mt-3 ml-[6px] flex flex-wrap">
          {data.data.data
            .filter((item) => !item.isUse)
            .filter((item) => item.function.includes(word))
            .map((item, index) => (
              <div
                className={`border border-[#EBEBEC] w-[360px] h-[76px] rounded-[20px] flex items-center font-spoqa text-base justify-between mb-3 ${
                  index % 2 === 0 ? 'mr-3' : 'ml-3'
                }`}
                key={item.function}
              >
                <div className="flex">
                  <img
                    className="ml-[13px] mr-[10px]"
                    src="/svg/note_edit.svg"
                  />
                  {item.function}
                </div>
                {role === 'ADMIN' && (
                  <div
                    className="w-[97px] h-9 border border-[#EBEBEC] rounded-[50px] flex items-center font-spoqa font-bold text-base justify-center mr-[18px] cursor-pointer"
                    onClick={() => addWorkspaceFunction.trigger(item.function)}
                  >
                    <CustomImage
                      alt="edit_plus"
                      className="mr-2"
                      src="/svg/edit_plus.svg"
                      width={24}
                      height={24}
                    />
                    <div className="pt-1">Add</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default WorkspaceAddFunctionContent
