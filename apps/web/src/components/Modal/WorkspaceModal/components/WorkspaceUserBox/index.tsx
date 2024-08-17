// ** Type Imports
import { CommonResponse, RoleType } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Recoil Imports
import { WorkspaceState } from '@/src/app'
import { useRecoilValue } from 'recoil'

// ** Service Imports
import { mutate } from 'swr'
import { Delete, Patch, Put } from '@/src/repository'
import useSWRMutation from 'swr/mutation'
import Image from 'next/image'
import CustomImage from '@/src/components/Image/CustomImage'

interface PropsType {
  id: number
  nickname: string
  email: string
  profile: string
  role: RoleType
}

const WorkspaceUserBox = ({
  id,
  nickname,
  email,
  role,
  profile,
}: PropsType) => {
  const { role: userRole } = useRecoilValue(WorkspaceState)

  const { handleOpen } = useDialog()

  const updateWorkspaceRole = useSWRMutation(
    '/v1/workspace-user',
    async (url: string, { arg }: { arg: RoleType }) =>
      await Put<CommonResponse<void>>(url, {
        id,
        role: arg,
      }),
    {
      onSuccess: ({ data }) => {
        mutate('/v1/workspace-user')
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

  const removeWorkspaceUser = useSWRMutation(
    `/v1/workspace-user/${id}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: ({ data }) => {
        mutate('/v1/workspace-user')
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

  return (
    <div className="mb-[21px] w-[726px] h-20 border-[#EBEBEC] border shadow-md rounded-[15px] flex items-center justify-between">
      <div className="flex">
        <Image
          src={profile}
          alt="Sample Image"
          width={45}
          height={45}
          className="rounded-[23px] ml-[17px] mr-4 "
        />
        <div className="h-[45px]">
          <div className="text-base font-spoqa">{nickname}</div>
          <div className="font-spoqa text-base text-[#9A9A9A]">{email}</div>
        </div>
      </div>
      {role === 'ADMIN' ? (
        <div className="flex mr-[15px]">
          <div className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center">
            ADMIN
          </div>
          <div style={{ width: 24 }} />
        </div>
      ) : (
        <div className="flex mr-[15px]">
          <select
            disabled={userRole !== 'ADMIN'}
            value={role}
            className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] mr-[15px] pl-[15px] flex items-center"
            onChange={(e) =>
              updateWorkspaceRole.trigger(e.target.value as RoleType)
            }
          >
            <option className="text-base font-spoqa" value="VIEWER">
              VIEWER
            </option>
            <option className="text-base font-spoqa" value="WRITER">
              WRITER
            </option>
            <option className="text-base font-spoqa" value="ADMIN">
              ADMIN
            </option>
          </select>
          <Image
            src="/svg/boldX.svg"
            alt="delete"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={removeWorkspaceUser.trigger}
          />
        </div>
      )}
    </div>
  )
}

export default WorkspaceUserBox
