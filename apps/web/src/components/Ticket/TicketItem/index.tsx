// ** Component Imports
import ProfileBox from "@/src/components/ProfileBox";
import { EpicTicketInfo } from "@/src/type/epic";
import dayjs from "dayjs";

interface PropsType {
  data: EpicTicketInfo;
  handleClick?: (id: number) => void;
}

const TicketItem = ({ handleClick = (id: number) => {}, data }: PropsType) => {
  return (
    <div
      className="flex h-[60px] hover:bg-slate-400 rounded-lg"
      onClick={() => handleClick(data.id)}
    >
      <div className="flex w-[10%] items-center justify-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
      </div>
      <div className="flex w-[40%] items-center">
        <h1>{`${data.code} ${data.name}`}</h1>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <div className="w-[84px] h-[40px] rounded-[6px] flex justify-center items-center bg-[#CAE0F4]">
          {data.status}
        </div>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <img
          src={data.worker.profile}
          width={30}
          height={30}
          alt="worker"
          className={`w-[30px] h-[30px] rounded-full border-2 border-[#EBEBEC] mr-[10px]`}
        />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>{data.dueDate ? dayjs(data.dueDate).format("YYYY-MM-DD") : "-"}</h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>
          {data.completeDate
            ? dayjs(data.completeDate).format("YYYY-MM-DD")
            : "-"}
        </h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>
          {data.reopenDate ? dayjs(data.reopenDate).format("YYYY-MM-DD") : "-"}
        </h1>
      </div>
    </div>
  );
};

export default TicketItem;
