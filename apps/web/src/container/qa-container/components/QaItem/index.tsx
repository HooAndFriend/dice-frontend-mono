// ** Type Imports
import { IssueInfo } from "@/src/type/qa";

// ** Utils Imports
import { getStateBoxColor } from "@/src/utils/color";
import dayjs from "dayjs";
import QaStatusButton from "../QaStatusButton";

interface PropsType {
  item: IssueInfo;
  handleOpenQa: (id: number) => void;
}

const QaItem = ({ item, handleOpenQa }: PropsType) => {
  return (
    <div
      className="px-4 w-full hover:bg-blue-50 h-[100px] py-2 border-b border-solid border-[#EBEBEC]"
      onClick={() => handleOpenQa(item.id)}
    >
      {/* <div className="w-full h-[30px] flex mb-[5px]">
          {dayjs().diff(dayjs(item.createdDate), "hour") <= 24 && (
            <div className="bg-[#F13333] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center font-spoqa text-base text-center">
              NEW
            </div>
          )}
        </div> */}
      <div className="flex w-full h-[30px] font-spoqa font-medium text-lg">
        <h1 className="font-bold">[{item.number}]</h1>
        <h1 className="ml-2">{item.title}</h1>
      </div>
      <div className="w-full h-[45px] flex justify-between items-end mb-2">
        <div className="flex items-center">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px] "
            src={item.admin.profile}
            width={30}
            height={30}
          />
          <div className="font-spoqa">{item.admin.nickname}</div>
        </div>
        <QaStatusButton status={item.status} />
      </div>
    </div>
  );
};

export default QaItem;
