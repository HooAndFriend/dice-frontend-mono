'use client'
// ** Next Imports
import { useRouter } from 'next/navigation'

// ** React Imports
import { Fragment, KeyboardEvent, useEffect, useState } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'

// ** Utils Imports
import useInput from '@/src/hooks/useInput'
import { getTicketSettingImage } from '@/src/utils/ticket-setting'

// ** Type Imports
import { GetEpicListResponse } from '@/src/type/epic'
import {
  GetTicketSettingListResponse,
  TicketSettingType,
} from '@/src/type/ticket'

// ** Swr Imports
import useSWRMutation from 'swr/mutation'
import { Get, Post } from '@/src/repository'
import useSWR from 'swr'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Component Imports
import CustomImage from '../../Image/CustomImage'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ticketSchema } from '@/src/schema/ticket'

interface PropsType {
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
}

const AddTicketModal = ({ open, setOpen, refetch }: PropsType) => {
  const [button, setButton] = useState<boolean>(false)
  const [epicId, setEpicId] = useState<number>(0)
  const [settingId, setSettingId] = useState<number>(0)
  const [settingType, setSettingType] = useState<TicketSettingType>('GREEN')
  const [modal, setModal] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
  })

  const addTicket = useSWRMutation(
    '/v1/ticket',
    async (
      url: string,
      { arg }: { arg: { name: string; settingId: number; epicId: number } },
    ) =>
      await Post<number>(url, {
        name: arg.name,
        settingId: arg.settingId,
        epicId: arg.epicId,
      }),
    {
      onSuccess: ({ data }) => {
        setOpen(false)
        refetch()
      },
      onError: (error) => {
        handleOpen({
          title: 'Error',
          message: error.response.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
        setButton(false)
      },
    },
  )

  const onSubmit = (data) => {
    addTicket.trigger({
      name: data.name,
      settingId: settingId,
      epicId: epicId,
    })
  }

  const {
    data: epic,
    error,
    isLoading,
  } = useSWR('/v1/epic', async (url) => Get<GetEpicListResponse>(url))

  const {
    data: settingData,
    error: settingError,
    isLoading: settingLoading,
  } = useSWR('/v1/ticket/setting', async (url) =>
    Get<GetTicketSettingListResponse>(url),
  )

  const { handleOpen } = useDialog()

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (button) return
      setButton(true)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-[8px] shadow-xl">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-5 w-[500px] h-[200px]bg-[#FAFAFB] "
                >
                  <div className="flex justify-between">
                    <h1 className="font-bold text-[24px]">Add Ticket</h1>
                    <h1
                      className="font-bold text-[24px] cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </h1>
                  </div>
                  <div className="flex items-center w-full mt-5">
                    <h1 className="w-1/5 mr-5">Ticket Name</h1>
                    <input
                      type="text"
                      {...register('name', { required: true })}
                      name="name"
                      id="name"
                      onKeyDown={handleEnter}
                      className="w-[400px] h-[40px] border-solid border-1 border-[#EFEFEF] rounded-[8px] pl-4 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center w-full mt-5">
                    <h1 className="w-1/5 mr-2">Epic</h1>
                    {epic?.data.data && (
                      <select
                        name="epicId"
                        onChange={(e) => {
                          setEpicId(Number(e.target.value))
                        }}
                        className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] pl-4"
                      >
                        {epic.data.data.map((item) => (
                          <option key={item.epicId} value={item.epicId}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <div className="flex items-center cursor-pointer ml-5 relative">
                      <div
                        className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
                        style={{
                          backgroundColor:
                            getTicketSettingImage(settingType).color,
                        }}
                        onClick={() => setModal(true)}
                      >
                        <CustomImage
                          src={getTicketSettingImage(settingType).url}
                          alt="ticket_setting"
                          width={16}
                          height={16}
                        />
                      </div>
                      {modal && (
                        <div className="absolute p-[8px] bg-[#F8FAFC] w-[184px] h-[184px] left-8 rounded-[10px] overflow-y-auto z-10 overflow-x-hidden top-[-100px]">
                          {settingData.data.data.map((item) => (
                            <div
                              className="w-[168px] h-[32px] hover:bg-[#F4F4FA] rounded-[8px] p-[8px] flex items-center cursor-pointer"
                              onClick={(e) => {
                                setSettingId(item.ticketSettingId)
                                setSettingType(item.type)
                                setModal(false)
                              }}
                            >
                              <div
                                className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
                                style={{
                                  backgroundColor: getTicketSettingImage(
                                    item.type,
                                  ).color,
                                }}
                              >
                                <CustomImage
                                  src={getTicketSettingImage(item.type).url}
                                  alt="ticket_setting"
                                  width={16}
                                  height={16}
                                />
                              </div>
                              <h3 className="text-[14px] ml-[12px]">
                                {item.name}
                              </h3>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="bg-[#623AD6] w-[72px] h-[32px] rounded-[12px] text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddTicketModal
