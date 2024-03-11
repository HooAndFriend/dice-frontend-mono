// ** React Imports
import { Fragment } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserDeleteModalView = ({ open, cancelButtonRef, setOpen }: PropsType) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl">
                <div className="w-[600px] h-[400px] rounded-[12px]">
                  <div className="w-full h-[64px] bg-[#623AD6] flex items-center justify-between px-4">
                    <h1 className="text-white">탈퇴회원 상세</h1>
                    <h1
                      className="font-bold text-white cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </h1>
                  </div>
                  <div className="w-full p-4">
                    <div className="w-full h-[20px] flex items-center">
                      <h1 className="w-[100px] px-4 font-bold">닉네임</h1>
                      <h1 className="text-[#696374]">babting</h1>
                    </div>
                    <div className="w-full h-[20px] flex items-center mt-[20px]">
                      <h1 className="w-[100px] px-4 font-bold">이메일</h1>
                      <h1 className="text-[#696374]">dlrkdls997@naver.com</h1>
                    </div>
                    <div className="w-full h-[20px] flex items-center mt-[20px]">
                      <h1 className="w-[100px] px-4 font-bold">가입구분</h1>
                      <h1 className="text-[#696374]">Google</h1>
                    </div>
                    <div className="w-full h-[20px] flex items-center mt-[20px]">
                      <h1 className="w-[100px] px-4 font-bold">가입일</h1>
                      <h1 className="text-[#696374]">2024-02-02 14:35:35</h1>
                    </div>
                    <div className="w-full h-[20px] flex items-center mt-[20px]">
                      <h1 className="w-[100px] px-4 font-bold">탈퇴일</h1>
                      <h1 className="text-[#696374]">2024-02-02 14:35:35</h1>
                    </div>
                    <div className="w-full h-[20px] flex items-center mt-[20px]">
                      <h1 className="w-[100px] px-4 font-bold">탈퇴사유</h1>
                      <h1 className="text-[#696374]">
                        서비스에 더 이상 필요한 게 없어 탈퇴합니다.
                      </h1>
                    </div>
                    <div className="flex justify-end w-full mt-[20px]">
                      <button
                        className="w-[60px] h-[40px] bg-[#623AD6] rounded-[8px] text-white"
                        onClick={() => setOpen(false)}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default UserDeleteModalView
