// ** React Imports
import { Fragment } from "react";

// ** ui Imports
import { Dialog, Transition } from "@headlessui/react";

// ** Component Imports
import SettingContent from "@/src/components/Modal/workspace-modal/components/setting-content";
import MemberContent from "@/src/components/Modal/workspace-modal/components/member-content";
import AddFunctionsContent from "@/src/components/Modal/workspace-modal/components/addfunctions-content";
import AddMemberContent from "./components/addMember-content";

interface PropsType {
  open: boolean;
  addOpen: boolean;
  cancelButtonRef: any;
  tab: number;
  setTab: (tab: number) => void;
  setAddOpen: (open: boolean) => void;
  setOpen: (open: boolean) => void;
}

const WorkspaceModalView = ({
  open,
  addOpen,
  cancelButtonRef,
  setOpen,
  setAddOpen,
  tab,
  setTab,
}: PropsType) => {
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
                <div className="flex w-full items-center justify-center bg-[#FAFAFB] ">
                  <div className="bg-white w-[1192px] h-[769px] rounded-2xl shadow-md">
                    <div className="mt-[45px] ml-[60px] w-[1072px] h-[38px] flex justify-between">
                      <div className="font-mosk font-bold text-[32px]">
                        Workspace Setting
                      </div>
                      <div onClick={() => setOpen(false)}>
                        <img
                          alt="X"
                          src="/svg/XButton.svg"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    <div className="flex w-[1072px] h-[601px] ml-[60px] mt-[41px] justify-between">
                      <div className="bg-main w-[274px] h-[601px] rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
                        <img
                          src="/images/dice.png"
                          alt="Sample Image"
                          className="w-[91px] h-[91px] object-cover rounded-full mt-[50px]"
                        />

                        <div className="mt-[21px] font-spoqa font-bold text-[25px] text-white">
                          DICE
                        </div>
                        <div className="w-[187px] h-[29.926px] mt-[60px] flex relative">
                          <img
                            src="/images/dice.png"
                            alt="Sample Image"
                            className="w-[29.204px] h-[29.926px] rounded-full"
                          />
                          <img
                            src="/images/dice.png"
                            alt="Sample Image"
                            className="w-[29.204px] h-[29.926px] rounded-full absolute left-[24.21px]"
                          />
                          <img
                            src="/images/dice.png"
                            alt="Sample Image"
                            className="w-[29.204px] h-[29.926px] rounded-full absolute left-[48.41px]"
                          />
                          <img
                            src="svg/dot.svg"
                            alt="Sample Image"
                            className="bg-white w-[29.204px] h-[29.926px] rounded-full absolute left-[72.62px]"
                          />
                        </div>
                        <div className="mt-[35.07px]">
                          <div
                            onClick={() => setTab(0)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-base font-bold font-spoqa ${
                              tab == 0
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <img
                              className="ml-[18px] mr-5"
                              src={
                                tab === 0
                                  ? "svg/setting.svg"
                                  : "svg/settingW.svg"
                              }
                              alt="setting"
                              width={24}
                              height={24}
                            />
                            Setting
                          </div>
                          <div
                            onClick={() => setTab(1)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-base font-bold font-spoqa ${
                              tab === 1
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <img
                              className="ml-[18px] mr-5"
                              src={tab === 1 ? "svg/team.svg" : "svg/teamW.svg"}
                              alt="member"
                              width={24}
                              height={24}
                            />
                            Member
                          </div>
                          <div
                            onClick={() => setTab(2)}
                            className={`w-[205px] h-[40px] rounded-full flex items-center text-base font-bold font-spoqa ${
                              tab === 2
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <img
                              className="ml-[18px] mr-5"
                              src={
                                tab === 2
                                  ? "svg/workspace.svg"
                                  : "svg/workspaceW.svg"
                              }
                              alt="addfunctions"
                              width={24}
                              height={24}
                            />
                            AddFunctions
                          </div>
                        </div>
                      </div>
                      <div className="w-[742px] h-[601px]">
                        {tab === 0 && <SettingContent />}
                        {tab === 1 && (
                          <MemberContent handleOpen={() => setAddOpen(true)} />
                        )}
                        {tab === 2 && <AddFunctionsContent />}
                        {addOpen && (
                          <AddMemberContent
                            open={addOpen}
                            setOpen={setAddOpen}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default WorkspaceModalView;
