'use client'

// ** Next Imports
import { useRouter } from 'next/navigation'

// ** React Imports
import { KeyboardEvent } from 'react'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Post } from '@/src/repository'

// ** Component Imports
import SaveWorkspaceContainer from '@/src/container/save-workspace-container'

// ** Utils Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'
import { SaveWorkspaceParam } from '@/src/type/workspace'
import { saveWorksapceSchema } from '@/src/schema/workspace'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'
import { useRecoilValue } from 'recoil'
import { WorkspaceState } from '@/src/app'

export default function Signup(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SaveWorkspaceParam>({
    resolver: zodResolver(saveWorksapceSchema),
    defaultValues: {
      name: '',
      profile:
        'https://firebasestorage.googleapis.com/v0/b/dice-dev-a5b63.appspot.com/o/images%2FIMG_6159.jpg?alt=media&token=450c0181-8826-4856-b611-509712872450',
      comment: '',
    },
  })

  const { uuid } = useRecoilValue(WorkspaceState)
  const { handleOpen } = useDialog()

  const router = useRouter()

  const saveWorkspace = useSWRMutation(
    '/v1/workspace',
    async (url: string, { arg }: { arg: SaveWorkspaceParam }) =>
      await Post<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        router.push(`/${uuid}/dashboard`)
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
    setValue('profile', profile)
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = (data: SaveWorkspaceParam) => {
    saveWorkspace.trigger(data)
  }

  return (
    <SaveWorkspaceContainer
      watch={watch}
      handleEnter={handleEnter}
      handleImage={handleImage}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  )
}
