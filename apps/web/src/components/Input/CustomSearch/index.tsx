import Image from "next/image";
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  value?: string;
  name?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearch = ({ value, onChange, name, width }: PropsType) => {
  return (
    <div
      className={`w-[${
        width ? width : "443px"
      }] h-[50px] rounded-[10px] bg-white border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4`}
    >
      <input
        className="h-[45px] w-full placeholder-[#EBEBEC] focus:outline-none"
        placeholder="Search"
        value={value}
        name={name}
        onChange={onChange}
      />
      <CustomImage
        src="/svg/searchIcon.svg"
        width={24}
        height={24}
        alt="search icon"
      />
    </div>
  );
};

export default CustomSearch;
