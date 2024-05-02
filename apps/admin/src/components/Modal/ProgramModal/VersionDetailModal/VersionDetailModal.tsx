// ** Provider Imports
import { Dialog, Transition } from "@headlessui/react"
// ** React Imports
import { Fragment } from 'react';

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
  handleCreate: (title: string) => void
}

const VersionDetailModalView = ({ open, cancelButtonRef, setOpen, handleCreate }) => {
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
                <div className="w-[600px] h-[520px] rounded-[12px] overflow-y-auto">
                  <div className="w-full h-[64px] bg-[#623AD6] flex items-center justify-between px-4">
                    <h1 className="text-white">버전 등록</h1>
                    <h1
                      className="font-bold text-white cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </h1>
                  </div>
                  <div className="w-full p-4">
                    <div className="flex items-center">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">관리자</h1>
                        <h1 className="text-[#696374]">이가인</h1>
                      </div>
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">등록일</h1>
                        <h1 className="text-[#696374]">2024-02-02 14:35:35</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">구분</h1>
                        <h1 className="text-[#696374]">Mac</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">버전명</h1>
                        <h1 className="text-[#696374]">1.0 version</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">프로그램</h1>
                        <a href="/README.md" download={true}>HIDICE_v1.0_exe</a>
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[100px] flex">
                        <h1 className="w-[120px] px-4 flex font-bold">메모</h1>
                        <p>기능 오류 해결 후 재업로드</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-[40px]">
                      <button
                        className="w-[60px] h-[40px] bg-[#D20000] rounded-[8px] text-white font-bold"
                      >
                        삭제
                      </button>
                      <button
                        className="w-[60px] h-[40px] bg-[#623AD6] rounded-[8px] text-white font-bold"
                        onClick={() => {
                          setOpen(false)
                          handleCreate("버전 수정")
                        }}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  )
}

export default VersionDetailModalView