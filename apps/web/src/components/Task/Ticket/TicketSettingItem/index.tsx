// ** Component Imports
import { SettingListInfo, TicketSettingType } from '@/src/type/ticket'

// ** Component Imports
import CustomInput from '../../../Input/CustomInput'
import CustomImage from '../../../Image/CustomImage'
import TicketSettingTypeButton from '../TicketSettingTypeButton'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Delete } from '@/src/repository'
import { mutate } from 'swr'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

interface PropsType {
  item: SettingListInfo
  handleData: (
    id: number,
    value: string | TicketSettingType,
    type: 'name' | 'type' | 'description',
  ) => void
}

const TicketSettingItem = ({ item, handleData }: PropsType) => {
  const { handleOpen } = useDialog()

  const setType = (type: TicketSettingType) => {
    handleData(item.ticketSettingId, type, 'type')
  }

  const deleteSettingType = useSWRMutation(
    `/v1/ticket/setting/${item.ticketSettingId}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        mutate('/v1/ticket/setting')
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
    <div className="flex items-center justify-between">
      <div className="flex h-[30px] items-center w-full">
        <div className="flex items-center justify-center">
          <TicketSettingTypeButton type={item.type} setType={setType} />
        </div>
        <div className="px-8">
          <CustomInput
            value={item.name}
            onChange={(e) =>
              handleData(item.ticketSettingId, e.target.value, 'name')
            }
            width="240px"
            height="30px"
            borderRadius="6px"
          />
        </div>
        <CustomInput
          value={item.description}
          onChange={(e) =>
            handleData(item.ticketSettingId, e.target.value, 'description')
          }
          width="300px"
          height="30px"
          borderRadius="6px"
        />
      </div>
      <div onClick={() => deleteSettingType.trigger()} className="ml-4">
        <CustomImage
          src={'/svg/boldX.svg'}
          alt="black-box"
          width={36}
          height={36}
        />
      </div>
    </div>
  )
}

export default TicketSettingItem
