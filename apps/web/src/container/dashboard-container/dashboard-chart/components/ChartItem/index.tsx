interface PropsType {
  id: string;
  name: string;

  status: "DOING" | "DONE";
}

const ChartItem = ({ id, name, status }: PropsType) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div
        className={`w-[100px] h-[27px] bg-[${
          status === "DOING" ? "#623AD6" : "#676767"
        }] rounded-[5px] items-center justify-center flex`}
      >
        <p className={`text-[${status === "DOING" ? "white" : "black"}]`}>
          {id}
        </p>
      </div>
      <p
        className={`${status === "DONE" && "line-through"}  text-[16px] text-[${
          status === "DONE" ? "#DDDDDD" : "black"
        }]`}
      >
        {name}
      </p>
    </div>
  );
};

export default ChartItem;
