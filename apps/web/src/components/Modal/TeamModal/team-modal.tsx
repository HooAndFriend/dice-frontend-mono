// ** Next Imports
import Image from "next/image";

// ** React Imports
import { Fragment } from "react";

// ** ui Imports
import { Dialog, Transition } from "@headlessui/react";

// ** Component Imports
import SettingContent from "./components/TeamSettingContent";
import MemberContent from "./components/TeamMemberContent";
import TeamWorkSpaceContent from "./components/TeamWorkspaceContent";
import AddMemberContent from "./components/TeamAddMemberContent";
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  open: boolean;
  addOpen: boolean;
  cancelButtonRef: any;
  tab: number;
  name: string;
  profile: string;
  setTab: (tab: number) => void;
  setAddOpen: (open: boolean) => void;
  setOpen: (open: boolean) => void;
}

const TeamModalView = ({
  open,
  addOpen,
  cancelButtonRef,
  setOpen,
  setAddOpen,
  tab,
  setTab,
  name,
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl">
                <div className="flex w-full items-center justify-center bg-[#FAFAFB] ">
                  <div className="bg-white w-[1192px] h-[769px] rounded-[20px] px-[45px] py-[60px] shadow-md">
                    <div className="w-[1072px] h-[38px] flex justify-between">
                      <div className="font-mosk text-[32px]">Team Setting</div>
                      <div>
                        <CustomImage
                          alt="X"
                          src="/svg/XButton.svg"
                          width={32}
                          height={32}
                          onClick={() => setOpen(false)}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex w-[1072px] h-[601px] pt-[40px] justify-between">
                      <div className="bg-main w-[274px] h-[601px] rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
                        <img
                          src={profile}
                          alt="Sample Image"
                          className="w-[91px] h-[91px] object-cover rounded-full mt-[52px]"
                        />
                        <div className="mt-[20px] font-san-bold text-[24px] text-white">
                          {name}
                        </div>
                        <div className="mt-[57px]">
                          <div
                            onClick={() => setTab(0)}
                            className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-[16px] font-san-bold cursor-pointer ${
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
                          <div
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
                              alt="member"
                              width={24}
                              height={24}
                            />
                            Member
                          </div>
                          <div
                            onClick={() => setTab(2)}
                            className={`w-[205px] h-[40px] rounded-full flex items-center text-[16px] font-san-bold cursor-pointer ${
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
                            WorkSpace
                          </div>
                        </div>
                      </div>
                      <div className="w-[742px] h-[601px]">
                        {tab === 0 && <SettingContent />}
                        {tab === 1 && (
                          <MemberContent handleOpen={() => setAddOpen(true)} />
                        )}
                        {tab === 2 && <TeamWorkSpaceContent />}
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

export default TeamModalView;
