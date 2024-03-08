import EpicItem from "../EpicItem";
import EpicAddItem from "../EpicAddItem";

const EpicTableView = () => {
  return (
    <div className="mt-6 h-[530px] overflow-auto w-full bg-white rounded-[20px] shadow-md py-4 px-8">
      <EpicItem />
      <EpicItem />
      <EpicItem />
      <EpicItem />
      <EpicItem />
      <EpicAddItem />
    </div>
  );
};

export default EpicTableView;
