interface PropsType {
  isEpic: boolean;
}

const TicketHeader = ({ isEpic }: PropsType) => {
  return (
    <div className="h-[44px] w-full bg-[#F4F4FA] rounded-[10px] flex">
      <div className="flex w-[10%] items-center justify-center">
        <h1>Type</h1>
      </div>
      <div className="flex w-[40%] items-center">
        <h1>Name</h1>
      </div>

      <div className="flex w-[20%] items-center justify-around">
        {!isEpic && <h1>Epic</h1>}
        <h1>Work</h1>
      </div>
      <div className="flex w-[15%] items-center justify-center">
        <h1>DueDate</h1>
      </div>
      <div className="flex items-center w-[15%] justify-center">
        <h1>Status</h1>
      </div>
    </div>
  );
};

export default TicketHeader;
