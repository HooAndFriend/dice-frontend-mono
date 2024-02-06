// ** Component Imports
import TeamModal from "@/src/components/modal/team-modal";
import ProfileBox from "../../profile-box";

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  setModalOpen: (value: boolean) => void;
  handleModalOpen: () => void;
  handleOpen: () => void;
  handleLogout: () => void;
}

const TeamPopoverView = ({
  open,
  modalOpen,
  cancelButtonRef,
  handleModalOpen,
  handleOpen,
  setModalOpen,
  handleLogout,
}: PropsType) => {
  return (
    <div>
      <div onClick={handleOpen}>
        <ProfileBox image="/images/profile.jpg" alt="profile" />
      </div>
      {open && (
        <div className="popover p-5 rounded-[20px] w-[350px] h-[250px] absolute bg-white shadow-md p- translate-y-10 -translate-x-3/4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">DICE</h3>
            <div className="flex items-center">
              <img
                src="/images/settings.png"
                width="18px"
                height="18px"
                className="mr-1"
              />
              <h4 className="mr-3 text-sm" onClick={handleModalOpen}>
                Setting
              </h4>
              <div className="flex" onClick={handleLogout}>
                <img
                  src="/images/logout.png"
                  width="18px"
                  height="18px"
                  className="mr-1"
                />
                <h3 className="mr-1 text-sm">Logout</h3>
              </div>
            </div>
          </div>
          <hr className="mt-3" />
          <div className="flex items-center mt-5">
            <img
              className="border rounded-[10px] mr-3"
              src="/images/profile.jpg"
              alt="profile"
              width="30px"
              height="30px"
            />
            <h4>HooAndFriend</h4>
          </div>
          <div className="flex items-center mt-5">
            <img
              className="border rounded-[10px] mr-3"
              src="/images/profile.jpg"
              alt="profile"
              width="30px"
              height="30px"
            />
            <h4>HooAndFriend</h4>
          </div>
          <div className="flex items-center mt-5">
            <img
              className="border rounded-[10px] mr-3"
              src="/images/plus.png"
              alt="profile"
              width="30px"
              height="30px"
            />
            <h4 className="text-[#EBEBEC]">Add Team</h4>
          </div>
        </div>
      )}
      {modalOpen && (
        <TeamModal
          open={modalOpen}
          setOpen={setModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default TeamPopoverView;
