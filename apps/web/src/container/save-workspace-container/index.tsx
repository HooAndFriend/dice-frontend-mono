// ** React Imports
import { KeyboardEvent } from 'react'

// ** Component Imports
import { ImageUploader } from '@/src/components/Image/ImageUploader'

// ** Type Imports
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { SaveWorkspaceParam } from '@/src/type/workspace'

interface PropsType {
  handleEnter: (e: KeyboardEvent<HTMLInputElement>) => void
  handleImage: (profile: string) => void
  register: UseFormRegister<SaveWorkspaceParam>
  handleSubmit: UseFormHandleSubmit<SaveWorkspaceParam>
  onSubmit: SubmitHandler<SaveWorkspaceParam>
  watch: UseFormWatch<SaveWorkspaceParam>
}

const SaveWorkspaceContainer = ({
  handleEnter,
  handleImage,
  register,
  handleSubmit,
  onSubmit,
  watch,
}: PropsType) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="-mt-12">
        <div className="flex justify-center w-full">
          <ImageUploader
            image={watch('profile')}
            width="192px"
            height="192px"
            borderRadius="96px"
            setPath={handleImage}
            borderWidth="3px"
            borderColor="#EBEBEC"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full mt-[30px]">
            <div>
              <label
                htmlFor="name"
                className="pb-1 pl-1 text-base font-medium text-black font-spoqa"
              >
                Name
              </label>
              <input
                type="text"
                className="font-normal font-spoqa border h-[50px] w-[330px] text-gray-900 text-base p-4 rounded-[12px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                placeholder="Enter Your Name"
                {...register('name')}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <div className="flex w-full mt-[30px]">
            <div>
              <label
                htmlFor="name"
                className="pb-1 pl-1 text-base font-medium text-black font-spoqa"
              >
                Description
              </label>
              <input
                type="text"
                className="font-normal font-spoqa border h-[50px] w-[330px] text-gray-900 text-base p-4 rounded-[12px] block border-[#EBEBEC] placeholder-[#DDD] dark:text-black "
                placeholder="Enter Your Description"
                {...register('comment')}
                onKeyDown={handleEnter}
              />
            </div>
          </div>
          <div className="flex w-full mt-[30px]">
            <button
              className="bg-[#623AD6] w-[330px] h-[55px] rounded-[12px] text-white"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SaveWorkspaceContainer
