interface PropsType {
  name: string;
  profile: string;
  count: string;
}

const ProfileBox = ({ name, profile, count }: PropsType) => {
  return (
    <div className="w-[361px] h-[89px] p-[25px] shadow-md flex items-center text-center justify-between rounded-[15px]">
      <div className="flex text-center items-center font-spoqa tracking-[-1px]">
        <img
          className="mr-4 rounded-full"
          src={profile}
          width={39}
          height={39}
        />
        {name}
      </div>
      <div className="font-spoqa tracking-[-1px]">{count}</div>
    </div>
  );
};

export default ProfileBox;
