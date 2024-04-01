// ** Next Imports
import Link from "next/link";

// ** Type Imports
import { WorkspaceInfo } from "@/src/type/workspace";

// ** Component Imports
import WorkspaceModal from "@/src/components/Modal/WorkspaceModal";
import ProfileBox from "../../ProfileBox";
import WorkspaceBox from "./component/workspace-box";

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  data: WorkspaceInfo[];
  id: number;
  teamName: string;
  profile: string;
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
  teamName,
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
              <h3 className="text-lg font-bold">{teamName}</h3>
              <div className="flex items-center" onClick={handleModalOpen}>
                <img
                  src="/images/settings.png"
                  width="18px"
                  height="18px"
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
                  <img
                    className="border rounded-[10px] mr-3"
                    src="/images/plus.png"
                    alt="profile"
                    width="30px"
                    height="30px"
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
