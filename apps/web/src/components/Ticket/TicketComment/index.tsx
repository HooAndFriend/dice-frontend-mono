import ProfileBox from "../../ProfileBox";

interface PropsType {}

const TicketComment = ({}: PropsType) => {
  return (
    <div className="mt-[36px]">
      <div className="flex items-center">
        <div className="w-[40px] flex justify-center">
          <ProfileBox image="/images/dice.png" alt="worker" />
        </div>
        <h3 className="px-2">김인후</h3>
        <h3>2024-01-03 11:10:23</h3>
      </div>
      <div className="pl-[40px] mt-[14px]">
        <p className="px-2">댓글 입니다.</p>
      </div>
    </div>
  );
};

export default TicketComment;
