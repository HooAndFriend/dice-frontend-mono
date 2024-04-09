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

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  data: WorkspaceInfo[];
  id: number;
  profile: string;
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
  id,
  profile,
  workspace,
  handleUpdateWorkspace,
}: PropsType) => {
  return (
    <div>
      <div onClick={handleOpen}>
        <ProfileBox image={profile} alt="profile" />
      </div>
      {open && (
        <>
          <div onClick={handleOpen} className="fixed inset-0 z-10" />
          <div className="popover p-5 rounded-[20px] w-[350px] h-[250px] absolute bg-white shadow-md p- -translate-y-full translate-x-20 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{workspace.name}</h3>
              <div className="flex items-center" onClick={handleModalOpen}>
                <Image
                  src="/images/settings.png"
                  alt="setting"
                  width={18}
                  height={18}
                  className="mr-1"
                />
                <h4 className="mr-1 text-sm">Setting</h4>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="mt-2 w-[350px] h-[150px] overflow-y-scroll">
              {data.map((item) => (
                <WorkspaceBox
                  key={item.id}
                  id={id}
                  workspaceId={item.id}
                  profile={item.workspace.profile}
                  name={item.workspace.name}
                  onClick={() => {
                    handleUpdateWorkspace(item);
                  }}
                />
              ))}
              <Link href="/save-workspace">
                <div className="flex items-center mt-5">
                  <Image
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
