import { ChangeEvent } from "react";

interface PropsType {
  value?: string;
  option: string;
  placeholder?: string;
  name?: string;
  width?: string;
  height?: string;
  item?: { label: string; value: string }[];
  setValue?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = ({
  option,
  item,
  value,
  setValue,
  name,
  width,
  height,
  placeholder,
}: PropsType) => {
  return (
    <select
      className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] text-[#EBEBEC] pl-4"
      value={value}
      name={name}
      onChange={setValue}
      placeholder={placeholder}
      style={{ width: width, height: height }}
    >
      {item ? (
        item.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))
      ) : (
        <option>{option}</option>
      )}
    </select>
  );
};

export default CustomSelect;
