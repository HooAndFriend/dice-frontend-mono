import { mutate } from 'swr'
import { Patch } from '@/src/repository'
import useSWRMutation from 'swr/mutation'
import { CommonResponse } from '@/src/type/common'
import { useDialog } from '@/src/context/DialogContext'
import { useState } from 'react'
import CustomImage from '../../../Image/CustomImage'

interface PropsType {
  value: string | null // 날짜가 null일 수 있도록 타입 수정
  ticketId: number
}

const TicketDatePicker = ({ value, ticketId }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen((c) => !c)
  const { handleOpen: handleDialogOpen } = useDialog()

  const updateTicket = useSWRMutation(
    'v1/ticket/dueDate',
    async (url: string, { arg }: { arg: string | null }) =>
      await Patch<CommonResponse<void>>(url, { ticketId, dueDate: arg }),
    {
      onSuccess: () => {
        mutate('/v1/ticket')
        mutate('/v1/epic')
        mutate(`/v1/ticket/detail/${ticketId}`)
        handleOpen()
      },
      onError: (error) => {
        handleDialogOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
      },
    },
  )

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTicket.trigger(e.target.value || null)
  }

  const handleClearDate = () => {
    updateTicket.trigger(null)
  }

  return (
    <div>
      {open ? (
        <div className="flex items-center">
          <input
            type="date"
            value={value || ''}
            onChange={handleOnChange}
            className="h-[40px] w-[200px] border-none bg-none"
          />
          <button onClick={handleClearDate} className="ml-[8px] text-red-500">
            Clear
          </button>
        </div>
      ) : (
        <div
          className="flex items-center px-[16px] h-[40px] bg-[#F2F4F6] rounded-[5px] w-[240px] justify-between cursor-pointer"
          onDoubleClick={handleOpen}
        >
          <p>{value ? value : '-'}</p>
          <CustomImage
            width={24}
            height={24}
            src="/svg/calendar.svg"
            className=""
            alt="calendar"
          />
        </div>
      )}
    </div>
  )
}

export default TicketDatePicker
