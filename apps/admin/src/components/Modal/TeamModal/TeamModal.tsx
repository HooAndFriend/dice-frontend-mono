// ** React Imports
import { Fragment } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'
import CustomTable from '../../Table'
import TablePagination from '../../Table/TablePagination'

interface PropsType {
  open: boolean
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const TeamModalView = ({ open, cancelButtonRef, setOpen }: PropsType) => {
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
                <div className="w-[600px] h-[620px] rounded-[12px] overflow-y-auto">
                  <div className="w-full h-[64px] bg-[#623AD6] flex items-center justify-between px-4">
                    <h1 className="text-white">팀 상세</h1>
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
                        <h1 className="w-[100px] px-4 font-bold">팀 명</h1>
                        <h1 className="text-[#696374]">DICE_DEV</h1>
                      </div>
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">생성자 ID</h1>
                        <h1 className="text-[#696374]">babting</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[20px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">생성일</h1>
                        <h1 className="text-[#696374]">2024-02-02 14:35:35</h1>
                      </div>
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">
                          최근 접속일
                        </h1>
                        <h1 className="text-[#696374]">2024-02-02 14:35:35</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[20px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">설명</h1>
                        <h1 className="text-[#696374]">
                          이 팀 이름은 DICE 입니다.
                        </h1>
                      </div>
                    </div>
                    <div className="w-full mt-[40px] px-4">
                      <h1 className="font-bold mb-[12px]">
                        ㅁ 소속 워크스페이스 수(3)
                      </h1>
                      <CustomTable
                        headerData={headerData}
                        bodyData={bodyData}
                        disabledClick
                      />
                      <div className="flex justify-end w-full">
                        <TablePagination />
                      </div>
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

export default TeamModalView

const headerData = [
  { name: '워크스페이스 명', size: '40%' },
  { name: '생성자 ID', size: '20%' },
  { name: '소속일', size: '40%' },
]

const bodyData = [
  [
    { name: 'DICE_DEV', size: '40%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '40%' },
  ],
  [
    { name: 'DICE_DEV', size: '40%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '40%' },
  ],
  [
    { name: 'DICE_DEV', size: '40%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '40%' },
  ],
]
