interface PropsType {
  id: number;
  teamId: number;
  profile: string;
  name: string;
  onClick: () => void;
}

const TeamBox = ({ profile, name, onClick, id, teamId }: PropsType) => {
  return (
    <div className="flex items-center mt-5" onClick={onClick}>
      <img
        className="border rounded-[10px] mr-3"
        src={profile}
        alt="profile"
        width="30px"
        height="30px"
      />
      <h4 className={`${id === teamId && "text-[#623AD6]"}`}>{name}</h4>
    </div>
  );
};

export default TeamBox;
