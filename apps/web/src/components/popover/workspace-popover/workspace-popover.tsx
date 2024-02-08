// ** Component Imports
import WorkspaceModal from "@/src/components/modal/workspace-modal";
import ProfileBox from "../../profile-box";
import { WorkspaceInfo } from "@/src/type/workspace";
import WorkspaceBox from "./component/workspace-box";

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  data: WorkspaceInfo[];
  id: number;
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
  handleUpdateWorkspace,
}: PropsType) => {
  return (
    <div>
      <div onClick={handleOpen}>
        <ProfileBox image="/images/profile.jpg" alt="profile" />
      </div>
      {open && (
        <div className="popover p-5 rounded-[20px] w-[350px] h-[250px] absolute bg-white shadow-md p- -translate-y-full translate-x-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">DICE</h3>
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
          {data.map((item) => (
            <WorkspaceBox
              key={item.id}
              id={id}
              workspaceId={item.id}
              profile={item.profile}
              name={item.name}
              onClick={() => {
                handleUpdateWorkspace(item);
              }}
            />
          ))}
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
        </div>
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
