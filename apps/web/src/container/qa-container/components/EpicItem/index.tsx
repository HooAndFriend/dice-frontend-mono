// ** Type Imports
import { IssueInfo } from "@/src/type/qa";
import { getStateBoxColor } from "@/src/utils/color";

// ** Utils Imports
import dayjs from "dayjs";

interface PropsType {
  item: IssueInfo;
  handleOpenQa: (id: number) => void;
}

const EpicItem = ({ item, handleOpenQa }: PropsType) => {
  console.log(getStateBoxColor(item.status));

  return (
    <div className="hover:bg-blue-50">
      <div onClick={() => handleOpenQa(item.id)} className="h-[125px] m-6">
        <div className="w-full h-[30px] flex mb-[5px]">
          <div className="flex items-center mr-5">{item.number}</div>
          {dayjs().diff(dayjs(item.createdDate), "hour") <= 24 && (
            <div className="bg-[#F13333] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center font-spoqa text-base text-center">
              NEW
            </div>
          )}
        </div>
        <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
          {item.title}
        </div>
        <div className="w-full h-[45px] flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="rounded-full border border-[#EBEBEC] mr-[10px] "
              src={item.admin.profile}
              width={30}
              height={30}
            />
            <div className="font-spoqa">{item.admin.nickname}</div>
          </div>
          <button
            className={`w-[120px] h-[45px] rounded-[30px] flex justify-center items-center text-white font-spoqa font-bold`}
            style={{ backgroundColor: getStateBoxColor(item.status) }}
          >
            {item.status}
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mx-6"></div>
    </div>
  );
};

export default EpicItem;
