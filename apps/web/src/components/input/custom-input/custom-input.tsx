interface PropsType {}

const CustomInputView = ({}: PropsType) => {
  return (
    <div className="w-[443px] h-[50px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4">
      <input
        className="h-[45px] placeholder-[#EBEBEC] focus:outline-none"
        placeholder="Search"
      />
      <img src="/svg/searchIcon.svg" width={24} height={24} />
    </div>
  );
};

export default CustomInputView;
