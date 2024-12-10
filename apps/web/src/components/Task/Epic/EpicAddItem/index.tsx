'use client'

// ** React Imports
import { KeyboardEvent, useState } from 'react'

// ** Component Imports
import CustomInput from '@/src/components/Input/CustomInput'

// ** Service Imports
import useSWRMutation from 'swr/mutation'
import { Post } from '@/src/repository'

// ** Type Imports
import { CommonResponse } from '@/src/type/common'

// ** Context Imports
import { useDialog } from '@/src/context/DialogContext'
import CustomImage from '@/src/components/Image/CustomImage'

const EpicAddItem = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [button, setButton] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const { handleOpen: handleModalOpen } = useDialog()

  const handleOpen = () => setOpen((c) => !c)

  const saveEpic = useSWRMutation(
    '/v1/epic',
    async (url: string) => await Post<CommonResponse<void>>(url, { name }),
    {
      onSuccess: () => {
        setButton(true)
        handleClose()
      },
      onError: (error) => {
        handleModalOpen({
          title: 'Error',
          message: error.response.data.message,
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })
        setButton(false)
      },
    },
  )

  const handleClose = () => {
    setOpen(false)
    setName('')
    setButton(false)
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (button) return
      setButton(true)

      if (name === '') {
        handleModalOpen({
          title: 'Error',
          message: 'Enter Epic Name',
          logLevel: 'warn',
          buttonText: 'Close',
          type: 'alert',
        })

        return
      }
      saveEpic.trigger()
    }

    if (e.key === 'Escape') {
      handleClose()
    }
  }

  return (
    <tr className="w-full border-b h-[76px]">
      <td
        className="p-4 align-middle text-center [&:has([role=checkbox])]:pr-0 pl-6"
        style={{ width: '5%' }}
      >
        <div className="flex items-center justify-center">
          <div className="flex items-center cursor-pointer">
            <div
              className="w-[24px] h-[24px] bg-green-300 items-center justify-center flex font-bold rounded-[6px] cursor-pointer"
              onClick={handleOpen}
            >
              +
            </div>
          </div>
        </div>
      </td>

      {open ? (
        <td
          className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6 flex items-center"
          style={{ width: '95%' }}
        >
          <CustomInput
            placeholder="Enter Epic Name"
            borderRadius="8px"
            height="26px"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleEnter}
          />
          <div
            className="ml-4 cursor-pointer"
            onClick={() => {
              if (name === '') {
                handleModalOpen({
                  title: 'Error',
                  message: 'Enter Epic Name',
                  logLevel: 'warn',
                  buttonText: 'Close',
                  type: 'alert',
                })

                return
              }

              saveEpic.trigger()
            }}
          >
            <CustomImage
              src={'/svg/add-black-box.svg'}
              alt="black-box"
              width={26}
              height={26}
            />
          </div>
          <div className="ml-4 cursor-pointer" onClick={handleClose}>
            <h1 className="font-bold text-[24px]">X</h1>
          </div>
        </td>
      ) : (
        <td
          className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium pl-6"
          style={{ width: '95%' }}
          colSpan={4}
        ></td>
      )}
    </tr>
  )
}

export default EpicAddItem
