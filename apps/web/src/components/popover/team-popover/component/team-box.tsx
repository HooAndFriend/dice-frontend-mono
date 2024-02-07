interface PropsType {
  profile: string;
  name: string;
}

const TeamBox = ({ profile, name }: PropsType) => {
  return (
    <div className="flex items-center mt-5">
      <img
        className="border rounded-[10px] mr-3"
        src={profile}
        alt="profile"
        width="30px"
        height="30px"
      />
      <h4>{name}</h4>
    </div>
  );
};

export default TeamBox;
