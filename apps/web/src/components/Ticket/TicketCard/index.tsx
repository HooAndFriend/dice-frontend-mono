import CustomInput from "../../Input/CustomInput";
import TicketComment from "../TicketComment";
import TicketStatusButton from "../TicketStatusButton";

const TicketCard = () => {
  return (
    <div className="mt-6 h-[530px] overflow-y-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <div className="flex items-center justify-between">
        <h1>DICE-3-게시판</h1>
        <div className="flex items-center">
          <button className="w-[110px] h-[40px] rounded-[30px] border-solid border-2 border-[#EBEBEC]">
            EDIT
          </button>
          <button className="w-[110px] h-[40px] rounded-[30px] bg-black text-white ml-4">
            DELETE
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-[30px]">
        <h1>상세보기</h1>
        <TicketStatusButton
          status="REOPEN"
          width="85px"
          height="30px"
          borderRadius="6px"
        />
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Type</h1>
        </div>
        <div className="flex items-center">
          <h3>SCREEN</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Admin</h1>
        </div>
        <div className="flex items-center">
          <h3>이가인</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>Worker</h1>
        </div>
        <div className="flex items-center">
          <h3>김인후</h3>
        </div>
      </div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>RegDate</h1>
        </div>
        <div className="flex items-center w-[110px]">
          <h3>2024-01-25</h3>
        </div>
        <div className="w-[110px]">
          <h1>ModDate</h1>
        </div>
        <div className="flex items-center w-[110px]">
          <h3>2024-01-25</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[110px]">
          <h1>DueDate</h1>
        </div>
        <div className="flex items-center w-[110px]">
          <h3>2024-01-25</h3>
        </div>
        <div className="w-[110px]">
          <h1>ComDate</h1>
        </div>
        <div className="flex items-center w-[110px]">
          <h3>2024-01-25</h3>
        </div>
      </div>
      <hr className="my-[20px]" />
      <h1 className="mb-4">Story Point</h1>
      <CustomInput width="480px" height="40px" borderRadius="10px" />
      <h1 className="my-4">Content</h1>
      <CustomInput width="480px" height="80px" borderRadius="10px" />
      <h1 className="my-4">File</h1>
      <div className="w-[40px] h-[40px] bg-green-300 rounded-lg"></div>
      <hr className="my-[20px]" />
      <div className="flex items-center">
        <CustomInput width="438px" height="40px" borderRadius="10px" />
        <div className="ml-4 w-[40px] h-[40px] rounded-[10px] bg-black text-white flex items-center justify-center">
          +
        </div>
      </div>
      <TicketComment />
      <TicketComment />
    </div>
  );
};

export default TicketCard;
