// ** Component Imports
import ProfileBox from "@/src/components/ProfileBox";

interface PropsType {
  id: number;
  handleClick?: (id: number) => void;
}

const TicketItem = ({ handleClick = (id: number) => {}, id }: PropsType) => {
  return (
    <div
      className="flex h-[60px] hover:bg-slate-400 rounded-lg"
      onClick={() => handleClick(id)}
    >
      <div className="flex w-[10%] items-center justify-center">
        <div className="w-[24px] h-[24px] bg-green-300 rounded-lg"></div>
      </div>
      <div className="flex w-[40%] items-center justify-center">
        <h1>DICE-3 게시판</h1>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <div className="w-[84px] h-[40px] rounded-[6px] flex justify-center items-center bg-[#CAE0F4]">
          완료
        </div>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <ProfileBox image="/images/dice.png" alt="worker" />
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>2023-11-19</h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>2023-11-19</h1>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <h1>-</h1>
      </div>
    </div>
  );
};

export default TicketItem;
