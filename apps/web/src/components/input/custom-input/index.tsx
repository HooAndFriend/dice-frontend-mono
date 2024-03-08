interface PropsType {
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const CustomInput = ({
  placeholder,
  width,
  height,
  borderRadius,
}: PropsType) => {
  return (
    <div
      className={`w-[${width}] h-[${height}] rounded-[${borderRadius}] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4`}
    >
      <input
        className="w-full placeholder-[#EBEBEC] focus:outline-none"
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
};

export default CustomInput;
