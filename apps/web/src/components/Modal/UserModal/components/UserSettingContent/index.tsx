// ** React Imports

import { useEffect } from 'react'

// ** Swr Imports
import useSWR, { mutate } from 'swr'
import { Get, Put } from '@/src/repository'
import useSWRMutation from 'swr/mutation'

// ** Recoil Imports
import { UserState } from '@/src/app'
import { useSetRecoilState } from 'recoil'

// ** Component Imports
import { ImageUploader } from '@/src/components/Image/ImageUploader'
import { GetUserInfoResponse, UserInfo } from '@/src/type/user'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'

const UserSettingContent = () => {
  const { data, setData, handleInput } = useInput<UserInfo>({
    email: '',
    nickname: '',
    profile: '',
  })

  const setUserState = useSetRecoilState(UserState)

  const { handleOpen } = useDialog()

  const {
    error,
    isLoading,
    data: userData,
  } = useSWR('/v1/user', async (url) => Get<GetUserInfoResponse>(url))

  const updateUser = useSWRMutation(
    '/v1/user',
    async (url: string) =>
      await Put<CommonResponse<void>>(url, {
        nickname: data.nickname,
        profile: data.profile,
      }),
    {
      onSuccess: ({ data: responseData }) => {
        mutate('/v1/user')
        setUserState((cur) => ({
          ...cur,
          profile: data.profile,
          nickname: data.nickname,
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

  useEffect(() => {
    if (isLoading) return

    if (error) return

    setData(userData.data)
  }, [userData])

  if (isLoading) return

  if (error) return

  return (
    <div>
      <label className="text-[20px] font-san-bold">Profile</label>
      <ImageUploader mode="edit" image={data.profile} setPath={handleImage} />
      <div className="mt-5">
        <label className="text-[20px] font-san-bold">Nickname</label>
        <input
          id="nickname"
          placeholder="Enter Your Nickname"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-[8px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.nickname}
          name="nickname"
          onChange={handleInput}
        />
      </div>
      <div className="mt-5">
        <label className="text-[20px] font-san-bold">Email</label>
        <input
          id="email"
          placeholder="Enter Your Email"
          className="mt-[14px] font-normal font-spoqa border h-[50px] w-full text-gray-900 text-base p-4 rounded-[8px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
          value={data.email}
          name="email"
          onChange={handleInput}
          disabled
        />
      </div>
      <button
        className="m-auto mt-[40px] w-[280px] h-[55px] bg-main ml-[202px] rounded-[15px] text-white font-san-bold text-[18px]"
        onClick={updateUser.trigger}
      >
        Update
      </button>
    </div>
  )
}

export default UserSettingContent
