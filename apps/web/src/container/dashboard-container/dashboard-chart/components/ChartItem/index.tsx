import { EpicStatus } from "@/src/type/epic";

interface PropsType {
  id: string;
  name: string;
  status: EpicStatus;
}

const ChartItem = ({ id, name, status }: PropsType) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div
        className="w-[100px] h-[27px] rounded-[5px] items-center justify-center flex"
        style={{
          backgroundColor: status === "COMPLETE" ? "#676767" : "#623AD6",
        }}
      >
        <p className={`text-[${status === "COMPLETE" ? "black" : "white"}]`}>
          {id}
        </p>
      </div>
      <p
        className={`${
          status === "COMPLETE" && "line-through"
        }  text-[16px] w-[200px] pl-4 justify-end flex text-[${
          status === "COMPLETE" ? "#DDDDDD" : "black"
        }]`}
      >
        {name}
      </p>
    </div>
  );
};

export default ChartItem;
