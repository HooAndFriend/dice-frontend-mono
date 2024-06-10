// ** Next Imports
import Link from "next/link";

// ** Type Imports
import { WorkspaceInfo } from "@/src/type/workspace";
import { WorkspaceStateType } from "@/src/app";

// ** Component Imports
import WorkspaceModal from "@/src/components/Modal/WorkspaceModal";
import WorkspaceBox from "./component/workspace-box";
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
    <>
      <div>
        <div className="py-3 cursor-pointer">
          <div
            className={`rounded-lg w-[40px] h-[40px] flex justify-center items-center`}
            onClick={handleOpen}
          >
            <CustomImage
              src={workspace.profile}
              width={36}
              height={36}
              alt="profile"
              className="rounded-lg"
            />
          </div>
        </div>
        {open && (
          <>
            <div onClick={handleOpen} className="fixed inset-0 z-10" />
            <div className="popover px-4 rounded-[20px] w-[300px] h-[200px] absolute bg-white shadow-md -translate-x-3 z-10">
              <div className="mt-2">
                {data.map((item) => (
                  <WorkspaceBox
                    key={item.workspaceUserId}
                    id={item.workspaceUserId}
                    workspaceId={workspace.workspaceId}
                    profile={item.workspace.profile}
                    name={item.workspace.name}
                    onClick={() => handleUpdateWorkspace(item)}
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
    </>
  );
};

export default WorkspacePopoverView;
