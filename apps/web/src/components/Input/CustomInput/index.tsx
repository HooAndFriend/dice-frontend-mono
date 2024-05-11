interface PropsType {
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  value?: string | number;
  name?: string;
  type?: "text" | "number";
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
  type,
}: PropsType) => {
  return (
    <input
      className={`w-[${width}] h-[${height}] rounded-[${borderRadius}] border border-[#EBEBEC] px-4 flex items-center placeholder-[#EBEBEC] focus:outline-none`}
      type={type ? type : "text"}
      placeholder={placeholder ? placeholder : ""}
      value={value}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default CustomInput;
