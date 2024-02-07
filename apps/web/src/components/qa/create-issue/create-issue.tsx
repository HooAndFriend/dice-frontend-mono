const CreateIssueView = () => {
  return (
    <div className="w-1/2 h-[564px] rounded-[20px] bg-white shadow-md border-[#EBEBEC] p-6 overflow-auto">
      <input
        className="h-[50px] w-full p-4 placeholder-[#EBEBEC] border border-[#EBEBEC] rounded-[10px]"
        placeholder="Enter Title"
      />
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-5 mt-5 flex">
        <div className="font-spoqa mr-[79px] font-medium">Admin</div>
        <div className="flex mr-[45px]">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src="/images/dice.png"
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">이가인</div>
        </div>
        <div className="font-spoqa mr-[80px]  font-medium">Worker</div>
        <div className="flex">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src="/images/dice.png"
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">김인후</div>
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-[20px] flex mt-5">
        <div className="font-spoqa font-medium mr-[65px]">RegDate</div>
        <div className="font-spoqa font-normal mr-[30px]">2024-01-15</div>
        <div className="font-spoqa font-medium mr-[58px]">modDate</div>
        <div className="font-spoqa font-normal">2024-01-15</div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="mt-5 mb-[14px]">As-Is</div>
      <input className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]" />
      <div className="mt-5 mb-[14px]">To-Be</div>
      <input className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]" />
      <div className="mt-5 mb-[14px]">Memo</div>
      <input className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]" />
      <div className="mt-5 mb-[14px]">
        FILE <span className="font-spoqa">(MAX:4)</span>
      </div>
      <div className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"></div>
      <div className="w-full flex justify-center">
        <button className="bg-main text-white font-spoqa font-bold w-[275px] h-[55px] rounded-[15px] mt-[40px]">
          ADD
        </button>
      </div>
    </div>
  );
};

export default CreateIssueView;
