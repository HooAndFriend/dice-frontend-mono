// ** Component Imports
import TeamModal from "@/src/components/modal/team-modal";
import ProfileBox from "../../profile-box";
import UserModal from "../../modal/user-modal";
import TeamBox from "./component/team-box";

// ** Type Imports
import { TeamUserInfo } from "@/src/type/team";

interface PropsType {
  open: boolean;
  modalTeamOpen: boolean;
  userModalOpen: boolean;
  cancelButtonRef: any;
  teamName: string;
  id: number;
  user: { email: string; nickname: string; profile: string };
  data: TeamUserInfo[];
  handleUpdateTeam: (item: TeamUserInfo | 0) => void;
  setTeamModalOpen: (value: boolean) => void;
  setUserModalOpen: (value: boolean) => void;
  handleModalOpen: () => void;
  handleOpen: () => void;
  handleLogout: () => void;
}

const TeamPopoverView = ({
  open,
  data,
  modalTeamOpen,
  cancelButtonRef,
  handleModalOpen,
  handleOpen,
  setTeamModalOpen,
  handleLogout,
  userModalOpen,
  setUserModalOpen,
  handleUpdateTeam,
  id,
  user,
  teamName,
}: PropsType) => {
  return (
    <div>
      <div onClick={handleOpen}>
        <ProfileBox image="/images/profile.jpg" alt="profile" />
      </div>
      {open && (
        <div className="popover p-5 rounded-[20px] w-[350px] h-[250px] absolute bg-white shadow-md p- translate-y-10 -translate-x-3/4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {id === 0 ? user.nickname : teamName}
            </h3>
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
          <div className="mt-2 w-[350px] h-[150px] overflow-y-scroll">
            <TeamBox
              id={id}
              teamId={0}
              profile={user.profile}
              name={user.nickname}
              onClick={() => handleUpdateTeam(0)}
            />
            {data.map((item) => (
              <TeamBox
                key={item.id}
                id={id}
                teamId={item.team.id}
                profile={item.team.profile}
                name={item.team.name}
                onClick={() => handleUpdateTeam(item)}
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
              <h4 className="text-[#EBEBEC]">Add Team</h4>
            </div>
          </div>
        </div>
      )}
      {modalTeamOpen && (
        <TeamModal
          open={modalTeamOpen}
          setOpen={setTeamModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
      {userModalOpen && (
        <UserModal
          open={userModalOpen}
          setOpen={setUserModalOpen}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default TeamPopoverView;
