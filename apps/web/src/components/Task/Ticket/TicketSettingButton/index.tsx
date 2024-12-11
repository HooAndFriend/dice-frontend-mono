// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** Type Imports
import { Get, Patch } from '@/src/repository'
import { CommonResponse } from '@/src/type/common'
import {
  GetTicketSettingListResponse,
  Ticket,
  TicketInfo,
} from '@/src/type/ticket'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import useSWR, { mutate } from 'swr'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Component Imports
import Tooltip from '../../../Tooltip'
import CustomImage from '../../../Image/CustomImage'
import { getTicketSettingImage } from '@/src/utils/ticket-setting'

interface PropsType {
  data: Ticket | TicketInfo
  isText: boolean
  disabled?: boolean
}

const TicketSettingButton = ({ data, isText, disabled }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState<boolean>(false)

  const { handleOpen: handleModalOpen } = useDialog()

  const handleOpen = () => {
    if (disabled) return
    setOpen((c) => !c)
  }

  const {
    data: settingData,
    error,
    isLoading,
  } = useSWR('/v1/ticket/setting', async (url) =>
    Get<GetTicketSettingListResponse>(url),
  )

  const updateTicketSetting = useSWRMutation(
    '/v1/ticket/ticket-setting',
    async (url: string, { arg }: { arg: number }) =>
      await Patch<CommonResponse<void>>(url, {
        ticketId: data.ticketId,
        settingId: arg,
      }),
    {
      onSuccess: () => {
        setOpen(false)
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${data.ticketId}`)
      },
      onError: (error) => {
        handleModalOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen()
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [])

  if (isLoading) return

  if (error) return

  return (
    <div className="relative z-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          handleOpen()
        }}
      >
        {data.ticketSetting ? (
          <div
            className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
            style={{
              backgroundColor: getTicketSettingImage(data.ticketSetting.type)
                .color,
            }}
          >
            <CustomImage
              src={getTicketSettingImage(data.ticketSetting.type).url}
              alt="ticket_setting"
              width={16}
              height={16}
            />
          </div>
        ) : (
          <div className="w-[24px] h-[24px] bg-green-300 rounded-[6px]" />
        )}

        {isText && (
          <h3 className="text-[16px] ml-4">
            {data.ticketSetting ? data.ticketSetting.name : '-'}
          </h3>
        )}
      </div>
      {open && (
        <div
          className="absolute p-[8px] bg-[#F8FAFC] w-[184px] h-[184px] top-[40px] left-0 rounded-[10px] overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          {settingData.data.data.map((item) => (
            <div
              className="w-[168px] h-[32px] hover:bg-[#F4F4FA] rounded-[8px] p-[8px] flex items-center cursor-pointer"
              onClick={() => updateTicketSetting.trigger(item.ticketSettingId)}
            >
              <div
                className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
                style={{
                  backgroundColor: getTicketSettingImage(item.type).color,
                }}
              >
                <CustomImage
                  src={getTicketSettingImage(item.type).url}
                  alt="ticket_setting"
                  width={16}
                  height={16}
                />
              </div>
              <h3 className="text-[14px] ml-[12px]">{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TicketSettingButton
