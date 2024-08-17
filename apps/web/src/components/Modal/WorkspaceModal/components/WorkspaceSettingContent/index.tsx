// ** Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// ** Component Imports
import { ImageUploader } from '@/src/components/Image/ImageUploader'

// ** Type Imports
import {
  GetWorkspaceInfoResponse,
  WorkspaceDetailInfo,
} from '@/src/type/workspace'
import { CommonResponse } from '@/src/type/common'

// ** Service Imports
import { Get, Put } from '@/src/repository'
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'

const WorkspaceSettingContent = () => {
  const { data, handleInput, setData } = useInput<WorkspaceDetailInfo>({
    workspaceId: 0,
    name: '',
    profile: '',
    comment: '',
  })

  const setWorkspaceState = useSetRecoilState(WorkspaceState)

  const { handleOpen } = useDialog()

  const { error, isLoading } = useSWR(
    '/v1/workspace/home',
    async (url) => Get<GetWorkspaceInfoResponse>(url),
    {
      onSuccess: (res) => {
        setData(res.data)
      },
    },
  )

  const updateWorkspace = useSWRMutation(
    '/v1/workspace',
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        name: data.name,
        comment: data.comment,
        profile: data.profile,
      }),
    {
      onSuccess: () => {
        mutate('/v1/workspace/home')

        setWorkspaceState((cur) => ({
          ...cur,
          profile: data.profile,
          name: data.name,
          comment: data.comment,
        }))
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

  const handleImage = (profile: string) => {
    setData((cur) => ({ ...cur, profile }))
  }

  return (
    <div>
      <label className="text-[18px] font-san-bold">Profile</label>
      <ImageUploader
        image={isLoading ? '' : data.profile}
        mode="edit"
        setPath={handleImage}
      />
      <div className="mt-6">
        <label className="text-[18px] font-san-bold">Workspace Name</label>
        <input
          id="workspace name"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-[8px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={isLoading ? '' : data.name}
          onChange={handleInput}
          name="name"
        />
      </div>
      <div className="mt-[30px]">
        <label className="text-[18px] font-san-bold">description</label>
        <input
          id="description"
          className="text-left mt-[14px] font-normal font-spoqa border h-[175px] w-full text-gray-900 text-base p-4 rounded-[8px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={isLoading ? '' : data.comment}
          onChange={handleInput}
          name="comment"
        />
      </div>
      <button
        className="m-auto mt-[30px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white text-[18px] font-san-bold"
        onClick={updateWorkspace.trigger}
      >
        Update
      </button>
    </div>
  )
}

export default WorkspaceSettingContent
