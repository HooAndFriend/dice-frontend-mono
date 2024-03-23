// ** Type Imports
import { IssueInfo } from "@/src/type/qa";

// ** Utils Imports
import QaStatusButton from "../QaStatusButton";
import QaUserButton from "../QaUserButton";

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
        <QaUserButton
          profile={item.worker.profile}
          nickname={item.worker.nickname}
          type="user"
          qaId={item.id}
        />
        <QaStatusButton status={item.status} qaId={item.id} />
      </div>
    </div>
  );
};

export default QaItem;
