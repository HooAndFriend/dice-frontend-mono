interface PropsType {
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  placeholder,
  width,
  height,
  borderRadius,
  value,
  name,
  onChange,
  onKeyDown,
}: PropsType) => {
  return (
    <div
      className={`w-[${width}] h-[${height}] rounded-[${borderRadius}] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4`}
    >
      <input
        className={`w-[${width}] placeholder-[#EBEBEC] focus:outline-none`}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CustomInput;
