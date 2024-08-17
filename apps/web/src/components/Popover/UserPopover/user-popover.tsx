// ** Next Imports
import dynamic from 'next/dynamic'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Component Imports
import ProfileBox from '../../ProfileBox'
import UserModal from '@/src/components/Modal/UserModal'

// ** Type Imports
import { UserStateType } from '@/src/app'

interface PropsType {
  open: boolean
  modalOpen: boolean
  cancelButtonRef: any
  userState: UserStateType
  setModalOpen: (value: boolean) => void
  handleModalOpen: () => void
  handleOpen: () => void
  handleLogout: () => void
}
const DynamicImage = dynamic(() => import('next/image'), { ssr: false })

const UserPopoverView = ({
  open,
  modalOpen,
  userState,
  cancelButtonRef,
  handleOpen,
  setModalOpen,
  handleModalOpen,
  handleLogout,
}: PropsType) => {
  const [nickname, setNickname] = useState<string>('')

  useEffect(() => {
    setNickname(userState.nickname)
  }, [userState])

  return (
    <div>
      <div onClick={handleOpen} className="flex items-center cursor-pointer">
        <DynamicImage
          width={24}
          height={24}
          src={userState.profile ? userState.profile : '/images/dice.png'}
          alt="profile"
          className=" rounded-[12px] mr-[8px]"
        />
        <h1 className="text-[16px]">{nickname}</h1>
      </div>
      {open && (
        <>
          <div onClick={handleOpen} className="fixed inset-0 z-10" />
          <div className="popover p-5 rounded-[20px] w-[240px] h-[160px] absolute bg-white shadow-md p- translate-y-10 -translate-x-48 z-10">
            <div className="flex items-center">
              <ProfileBox
                image={
                  userState.profile ? userState.profile : '/images/dice.png'
                }
                alt="profile"
                width={40}
                height={40}
              />
              <div>
                <h1>{userState.nickname}</h1>
                <h1 className="text-[12px] overflow-x-hidden text-gray-400">
                  {userState.email}
                </h1>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="mt-2">
              <h1 className="cursor-pointer " onClick={handleModalOpen}>
                Setting
              </h1>
            </div>
            <div className="mt-2">
              <h1 className="cursor-pointer " onClick={handleLogout}>
                Logout
              </h1>
            </div>
          </div>
        </>
      )}
      {modalOpen && (
        <UserModal
          open={modalOpen}
          setOpen={setModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  )
}

export default UserPopoverView
