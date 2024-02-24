// ** Next Imports
import CustomInput from "@/src/components/Input/custom-input";
import Image from "next/image";

interface PropsType {
  open: boolean;
  handleOpen: () => void;
}
const EpicAddItemView = ({ open, handleOpen }: PropsType) => {
  return (
    <div className="w-full h-[75px] flex items-center">
      {open ? (
        <>
          <div className="mr-8 w-[24px] h-[24px] bg-green-300 rounded-lg" />
          <CustomInput placeholder="Enter Epic Name" />
          <div className="ml-4">
            <Image
              onClick={handleOpen}
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
        </>
      ) : (
        <div onClick={handleOpen} className="flex items-center w-full h-full">
          <Image src="/svg/add-box.svg" width={36} height={36} alt="add-box" />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Epic
          </h1>
        </div>
      )}
    </div>
  );
};

export default EpicAddItemView;
