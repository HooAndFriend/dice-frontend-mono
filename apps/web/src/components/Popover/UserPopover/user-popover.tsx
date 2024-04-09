// ** Next Imports
import Image from "next/image";

// ** Component Imports
import ProfileBox from "../../ProfileBox";
import UserModal from "@/src/components/Modal/UserModal";

interface PropsType {
  open: boolean;
  modalOpen: boolean;
  cancelButtonRef: any;
  setModalOpen: (value: boolean) => void;
  handleModalOpen: () => void;
  handleOpen: () => void;
}

const UserPopoverView = ({
  open,
  modalOpen,
  cancelButtonRef,
  handleModalOpen,
  handleOpen,
  setModalOpen,
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
              <Image
                alt="setting"
                src="/images/settings.png"
                width={18}
                height={18}
                className="mr-1"
              />
              <h4 className="mr-1 text-sm">Setting</h4>
            </div>
          </div>
          <hr className="mt-3" />
          <div className="flex items-center mt-5">
            <Image
              className="border rounded-[10px] mr-3"
              src="/images/profile.jpg"
              alt="profile"
              width={30}
              height={30}
            />
            <h4>HooAndFriend</h4>
          </div>
          <div className="flex items-center mt-5">
            <Image
              className="border rounded-[10px] mr-3"
              src="/images/profile.jpg"
              alt="profile"
              width={30}
              height={30}
            />
            <h4>HooAndFriend</h4>
          </div>
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
        </div>
      )}
      {modalOpen && (
        <UserModal
          open={modalOpen}
          setOpen={setModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default UserPopoverView;
