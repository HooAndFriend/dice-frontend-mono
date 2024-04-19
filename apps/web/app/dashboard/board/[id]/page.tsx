// ** Component Imports
import BoardContainer from "@/src/container/board-container";

const BoardPage = ({ params }) => {
  return <BoardContainer boardId={Number(params.id)} />;
};

export default BoardPage;
