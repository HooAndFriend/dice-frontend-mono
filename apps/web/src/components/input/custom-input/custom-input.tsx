interface PropsType {
  placeholder?: string;
}

const CustomInputView = ({ placeholder }: PropsType) => {
  return (
    <div className="w-[443px] h-[50px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4">
      <input
        className="h-[45px] placeholder-[#EBEBEC] focus:outline-none"
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
};

export default CustomInputView;
