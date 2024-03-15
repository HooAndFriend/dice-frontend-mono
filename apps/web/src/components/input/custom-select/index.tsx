import { ChangeEvent } from "react";

interface PropsType {
  value?: string;
  setValue?: (e: ChangeEvent<HTMLSelectElement>) => void;
  option: string;
  item?: { label: string; value: string }[];
}

const CustomSelect = ({ option, item, value, setValue }: PropsType) => {
  return (
    <select
      className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] text-[#EBEBEC] pl-4"
      value={value}
      onChange={setValue}
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
