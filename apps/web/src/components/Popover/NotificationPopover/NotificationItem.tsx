// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'
import { Notification } from '@/src/type/notification'

// ** Utils Imports
import dayjs from 'dayjs'

// ** Service Imports
import { Patch } from '@/src/repository'
import useSWRMutation from 'swr/mutation'
import { mutate } from 'swr'

interface PropsType {
  data: Notification
}

const NotificationItem = ({ data }: PropsType) => {
  const { handleOpen: handleDialogOpen } = useDialog()

  const readNotification = useSWRMutation(
    `/push/v1/notification/${data.id}`,
    async (url: string) => await Patch<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        mutate('/push/v1/notification')
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

  return (
    <div
      className="flex mt-4 cursor-pointer"
      onClick={readNotification.trigger}
    >
      <div className="w-[320px] px-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-san-bold">{data.title}</p>
          <p className="text-[10px] text-gray-500 mt-1">
            {dayjs(data.createdDate).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        </div>
        <p className="text-[12px] py-[5px]">{data.body}</p>
      </div>
    </div>
  )
}

export default NotificationItem
