import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// ** Component Imports
import Tooltip from '@/src/components/Tooltip'

// ** Type Imports
import { WorkspaceUser } from '@/src/type/workspace'
import Image from 'next/image'

interface PropsType {
  open: boolean
  name: string
  email: string
  profile: string
  nickname: string
  width?: number
  height?: number
  isLoading: boolean
  isNickname: boolean
  data: WorkspaceUser[]
  handleOpen: () => void
  handleName: (e: ChangeEvent<HTMLInputElement>) => void
  handleUpdateUser: (userId: number) => void
}

const UserSelectPopover = ({
  open,
  name,
  email,
  profile,
  nickname,
  width,
  height,
  isLoading,
  isNickname,
  data,
  handleOpen,
  handleName,
  handleUpdateUser,
}: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

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

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPosition({ x: e.clientX, y: e.clientY }) // 마우스 위치 저장
    handleOpen()
  }

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleButtonClick}
      >
        <Tooltip text={nickname}>
          <div className="w-[30px] h-[30px] min-w-[30px] min-h-[30px]">
            <Image
              className="rounded-[15px] border border-[#EBEBEC] mr-[10px]"
              src={profile ? profile : '/image/dice.png'}
              alt="profile"
              width={width || 30}
              height={height || 30}
              style={{ width: '30px', height: '30px' }}
            />
          </div>
        </Tooltip>
        {isNickname && (
          <div className="ml-2 font-spoqa font-[16px]">{nickname}</div>
        )}
      </div>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute w-[222px] h-[158px] bg-white shadow-lg rounded-[8px] overflow-y-auto z-[9999] overflow-x-hidden"
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y + 10,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex items-center justify-center w-full px-2 py-2">
              <input
                type="text"
                className="w-full h-8 border-none focus:outline-none"
                value={name}
                onChange={handleName}
                placeholder="Search.."
              />
            </div>
            <hr className="w-full" />
            <div className="px-[8px] py-[8px]">
              {data.map((item) => (
                <div
                  className="flex w-[206px] h-[32px] items-center rounded-[8px] cursor-pointer"
                  key={item.workspaceUserId}
                  onClick={() => handleUpdateUser(item.user.userId)}
                  style={{
                    backgroundColor:
                      item.user.email === email ? '#F4F4FA' : 'white',
                  }}
                >
                  <Image
                    className="rounded-[10px] border border-[#EBEBEC] mr-[10px]"
                    alt="profile"
                    src={item.user.profile}
                    width={20}
                    height={20}
                  />
                  <p className="text-[12px] text-black">{item.user.nickname}</p>
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

export default UserSelectPopover
