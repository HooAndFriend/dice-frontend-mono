// ** React Imports
import { Fragment } from 'react';

// ** Provider Imports
import { Dialog, Transition } from "@headlessui/react"

interface PropsType {
  open: boolean
  title: string
  cancelButtonRef: any
  setOpen: (oopen: boolean) => void
}

const VersionModalView = ({ open, title, cancelButtonRef, setOpen }) => {
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
                    <h1 className="text-white">{title}</h1>
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
                        <h1 className="w-[120px] px-4 font-bold">구분
                          <span className="text-[#FF0000]">*</span>
                        </h1>
                        <div className="flex items-center">
                          <label><input type="radio" name="type" className="mx-2" defaultChecked />Window</label>
                          <label><input type="radio" name="type" className="mx-2" />Mac</label>

                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">버전명
                          <span className="text-[#FF0000]">*</span>
                        </h1>
                        <input
                          name="version-name"
                          type="text"
                          placeholder="버전명을 입력해 주세요"
                          className="w-[440px] h-[20] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[120px] px-4 font-bold">프로그램
                          <span className="text-[#FF0000]">*</span>
                        </h1>
                        <label
                          htmlFor="input-file"
                          className="w-[100px] h-[40px] bg-[#623AD6] rounded-[8px] text-white grid place-items-center font-bold "
                        >첨부파일</label>
                        <input
                          id="input-file"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center mt-[40px]">
                      <div className="w-full h-[100px] flex">
                        <h1 className="w-[120px] px-4 flex font-bold">메모</h1>
                        <textarea
                          name="memo"
                          style={{ resize: 'none' }}
                          placeholder="메모 내용을 입력해 주세요"
                          className="w-[440px] h-[100px] bg-[#F8F8F8] border-solid border-1 border-[#EFEFEF] rounded-[8px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-[40px]">
                      <button
                        className="w-[60px] h-[40px] bg-[#623AD6] rounded-[8px] text-white font-bold"
                        onClick={() => setOpen(false)}
                      >
                        저장
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

export default VersionModalView