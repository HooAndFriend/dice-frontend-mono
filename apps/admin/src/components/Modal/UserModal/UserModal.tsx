// ** React Imports
import { Fragment } from 'react'

// ** ui Imports
import { Dialog, Transition } from '@headlessui/react'
import CustomTable from '../../Table'
import TablePagination from '../../Table/TablePagination'

// ** Type Imports
import { UserInfo, UserTeam, UserWorkspace } from '@/src/type/user'
import { formatDate } from '@/src/pages/user-page'

interface PropsType {
  open: boolean
  userData: UserInfo
  teamData: UserTeam[]
  workspaceData: UserWorkspace[]
  teamCount: number
  workspaceCount: number
  cancelButtonRef: any
  setOpen: (open: boolean) => void
}

const UserModalView = ({ open, userData, teamData, workspaceData, teamCount, workspaceCount,cancelButtonRef, setOpen }: PropsType) => {

  const TeamBodyData = teamData.map((team) => [
    {name: team.team.name, size: '30%'},
    {name: team.role, size: '20%'},
    {name: team.invitedId, size: '20%'},
    {name: formatDate(team.createdDate), size: '30%'}
  ]);

  const WorkspaceBodyData = workspaceData.map((workspace) => [
    {name: workspace.workspace.name, size: '30%'},
    {name: workspace.role, size: '20%'},
    {name: workspace.invitedId, size: '20%'},
    {name: formatDate(workspace.createdDate), size: '30%'}
  ])

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
                <div className="w-[600px] h-[800px] rounded-[12px] overflow-y-auto">
                  <div className="w-full h-[64px] bg-[#623AD6] flex items-center justify-between px-4">
                    <h1 className="text-white">사용자 상세</h1>
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
                        <h1 className="w-[100px] px-4 font-bold">닉네임</h1>
                        <h1 className="text-[#696374]">{userData.nickname}</h1>
                      </div>
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">이메일</h1>
                        <h1 className="text-[#696374]">{userData.email}</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[20px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">가입구분</h1>
                        <h1 className="text-[#696374]">{userData.type}</h1>
                      </div>
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">가입일</h1>
                        <h1 className="text-[#696374]">{formatDate(userData.createdDate)}</h1>
                      </div>
                    </div>
                    <div className="flex items-center mt-[20px]">
                      <div className="w-full h-[20px] flex items-center">
                        <h1 className="w-[100px] px-4 font-bold">
                          최근 로그인
                        </h1>
                        <h1 className="text-[#696374]">{formatDate(userData.lastLoginDate)}</h1>
                      </div>
                    </div>
                    <div className="w-full mt-[20px] px-4">
                      <h1 className="font-bold mb-[12px]">ㅁ 소속 팀 수 ( {teamCount} )</h1>
                      <CustomTable
                        headerData={headerData}
                        bodyData={TeamBodyData}
                        disabledClick
                      />
                      <div className="flex justify-end w-full">
                      </div>
                    </div>
                    <div className="w-full mt-[20px] px-4">
                      <h1 className="font-bold mb-[12px]">
                        ㅁ 소속 워크스페이스 수 ( {workspaceCount} )
                      </h1>
                      <CustomTable
                        headerData={headerWorkspaceData}
                        bodyData={WorkspaceBodyData}
                        disabledClick
                      />
                      <div className="flex justify-end w-full">
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

export default UserModalView

const headerData = [
  { name: '팀 명', size: '30%' },
  { name: '소유 권한', size: '20%' },
  { name: '초대자 ID', size: '20%' },
  { name: '소속일', size: '30%' },
]

const headerWorkspaceData = [
  { name: '워크스페이스 명', size: '30%' },
  { name: '소유 권한', size: '20%' },
  { name: '초대자 ID', size: '20%' },
  { name: '소속일', size: '30%' },
]

  const bodyData = [
  [
    { name: 'DICE_DEV', size: '30%' },
    { name: 'Admin', size: '20%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '30%' },
  ],
  [
    { name: 'DICE_DEV', size: '30%' },
    { name: 'Admin', size: '20%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '30%' },
  ],
  [
    { name: 'DICE_DEV', size: '30%' },
    { name: 'Admin', size: '20%' },
    { name: 'babting', size: '20%' },
    { name: '2024-01-01 23:10:12', size: '30%' },
    ],
  ]
