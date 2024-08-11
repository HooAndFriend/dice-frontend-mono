// ** React Imports
import { Fragment } from "react";

// ** ui Imports
import { Dialog, Transition } from "@headlessui/react";

// ** Component Imports
import SettingContent from "./components/UserSettingContent";
import TeamContent from "./components/UserTeamContent";
import WorkspaceContent from "./components/UserWorkspaceContent";
import Image from "next/image";
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  tab: number;
  profile: string;
  nickname: string;
  setTab: (tab: number) => void;
  setOpen: (open: boolean) => void;
}

const UserModalView = ({
  open,
  cancelButtonRef,
  setOpen,
  tab,
  setTab,
  nickname,
  profile,
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-[8px] shadow-xl">
                <div className="flex items-center justify-center bg-[#FAFAFB] ">
                  <div className="bg-white w-[1192px] h-[769px] rounded-[20px] shadow-md px-[45px] py-[60px]">
                    <div className="w-[1072px] h-[38px] flex justify-between">
                      <div className="font-mosk text-[32px]">User Setting</div>
                      <div onClick={() => setOpen(false)}>
                        <Image
                          alt="X"
                          src="/svg/XButton.svg"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    <div className="flex w-[1072px] h-[601px] pt-[40px] justify-between">
                      <div className="bg-main w-[274px] h-full rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
                        <Image
                          width={91}
                          height={91}
                          src={profile}
                          alt="Sample Image"
                          className="w-[91px] h-[91px] object-cover rounded-[20px] mt-[52px]"
                        />
                        <div className="mt-[20px] font-san-bold text-[24px] text-white">
                          {nickname}
                        </div>
                        <div className="mt-[57px]">
                          <div
                            onClick={() => setTab(0)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-[20px] flex items-center text-[16px] font-san-bold cursor-pointer ${
                              tab === 0
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <CustomImage
                              className="ml-[18px] mr-5"
                              src={
                                tab === 0
                                  ? "/svg/setting.svg"
                                  : "/svg/settingW.svg"
                              }
                              alt="setting"
                              width={24}
                              height={24}
                            />
                            Setting
                          </div>
                          {/* <div
                            onClick={() => setTab(1)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-[16px] font-san-bold cursor-pointer ${
                              tab === 1
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <CustomImage
                              className="ml-[18px] mr-5"
                              src={
                                tab === 1 ? "/svg/team.svg" : "/svg/teamW.svg"
                              }
                              alt="team"
                              width={24}
                              height={24}
                            />
                            Team
                          </div> */}
                          <div
                            onClick={() => setTab(2)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-[20px] flex items-center text-[16px] font-san-bold cursor-pointer ${
                              tab === 2
                                ? "text-main bg-white"
                                : "bg-main text-white"
                            }`}
                          >
                            <CustomImage
                              className="ml-[18px] mr-5"
                              src={
                                tab === 2
                                  ? "/svg/workspace.svg"
                                  : "/svg/workspaceW.svg"
                              }
                              alt="workspace"
                              width={24}
                              height={24}
                            />
                            Workspace
                          </div>
                        </div>
                      </div>
                      <div className="w-[742px] h-[601px]">
                        {tab === 0 && <SettingContent />}
                        {/* {tab === 1 && <TeamContent />} */}
                        {tab === 2 && <WorkspaceContent />}
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

export default UserModalView;
