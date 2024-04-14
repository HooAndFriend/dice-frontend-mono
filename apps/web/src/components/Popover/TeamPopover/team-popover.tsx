// ** Next Imports
import Link from "next/link";

// ** Component Imports
import TeamModal from "@/src/components/Modal/TeamModal";
import CustomImage from "../../Image/CustomImage";
import TeamBox from "./component/team-box";

// ** Type Imports
import { TeamUserInfo } from "@/src/type/team";
import { TeamStateType } from "@/src/app";

interface PropsType {
  open: boolean;
  modalTeamOpen: boolean;
  cancelButtonRef: any;
  uuid: string;
  data: TeamUserInfo[];
  profile: string;
  handleUpdateTeam: (item: TeamUserInfo | 0) => void;
  setTeamModalOpen: (value: boolean) => void;
  handleModalOpen: () => void;
  handleOpen: () => void;
}

const TeamPopoverView = ({
  open,
  data,
  modalTeamOpen,
  cancelButtonRef,
  handleModalOpen,
  handleOpen,
  setTeamModalOpen,
  handleUpdateTeam,
  uuid,
  profile,
}: PropsType) => {
  return (
    <>
      <div>
        <div className="py-3">
          <div
            className={`rounded-lg w-[40px] h-[40px] flex justify-center items-center`}
            onClick={handleOpen}
          >
            <CustomImage
              src={profile}
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
                  <TeamBox
                    key={item.id}
                    uuid={item.team.uuid}
                    teamUuid={uuid}
                    profile={item.team.profile}
                    name={item.team.name}
                    onClick={() => handleUpdateTeam(item)}
                    handleModalOpen={handleModalOpen}
                  />
                ))}
                <Link href="/save-team">
                  <div className="flex items-center mt-5">
                    <CustomImage
                      className="border rounded-[10px] mr-3"
                      src="/images/plus.png"
                      alt="profile"
                      width={30}
                      height={30}
                    />
                    <h4 className="text-[#EBEBEC]">Add Team</h4>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
        {modalTeamOpen && (
          <TeamModal
            open={modalTeamOpen}
            setOpen={setTeamModalOpen}
            cancelButtonRef={cancelButtonRef}
          />
        )}
      </div>
    </>
  );
};

export default TeamPopoverView;
