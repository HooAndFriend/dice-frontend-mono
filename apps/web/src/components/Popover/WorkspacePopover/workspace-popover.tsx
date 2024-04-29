// ** Next Imports
import Link from "next/link";

// ** Type Imports
import { WorkspaceInfo } from "@/src/type/workspace";

// ** Component Imports
import WorkspaceModal from "@/src/components/Modal/WorkspaceModal";
import ProfileBox from "../../ProfileBox";
import WorkspaceBox from "./component/workspace-box";
import { WorkspaceStateType } from "@/src/app";
import Image from "next/image";
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  data: WorkspaceInfo[];

  workspace: WorkspaceStateType;
  setModalOpen: (value: boolean) => void;
  handleModalOpen: () => void;
  handleOpen: () => void;
  handleUpdateWorkspace: (item: WorkspaceInfo) => void;
}

const WorkspacePopoverView = ({
  open,
  modalOpen,
  cancelButtonRef,
  handleModalOpen,
  handleOpen,
  setModalOpen,
  data,
  workspace,
  handleUpdateWorkspace,
}: PropsType) => {
  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex items-center cursor-pointer ml-[64px]"
      >
        <h1 className="text-[18px] font-bold">workspace</h1>
        <CustomImage
          src="/svg/arrow-down.svg"
          width={18}
          height={18}
          alt="down"
          className="ml-1"
        />
      </div>
      {open && (
        <>
          <div onClick={handleOpen} className="fixed inset-0 z-10" />
          <div className="popover px-4 rounded-[20px] w-[300px] h-[200px] absolute bg-white shadow-md z-10">
            <div className="mt-2">
              {data.map((item) => (
                <WorkspaceBox
                  key={item.id}
                  id={workspace.id}
                  workspaceId={item.id}
                  profile={item.workspace.profile}
                  name={item.workspace.name}
                  onClick={() => {
                    handleUpdateWorkspace(item);
                  }}
                  handleModalOpen={handleModalOpen}
                />
              ))}
              <Link href="/save-workspace">
                <div className="flex items-center mt-5">
                  <CustomImage
                    className="border rounded-[10px] mr-3"
                    src="/images/plus.png"
                    alt="profile"
                    width={30}
                    height={30}
                  />
                  <h4 className="text-[#EBEBEC]">Add Workspace</h4>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {modalOpen && (
        <WorkspaceModal
          open={modalOpen}
          setOpen={setModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default WorkspacePopoverView;
