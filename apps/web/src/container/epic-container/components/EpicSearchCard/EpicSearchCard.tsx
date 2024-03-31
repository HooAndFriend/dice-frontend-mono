// ** Componnet Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import CustomSelect from "@/src/components/Input/CustomSelect";

interface PropsType {
  pathname: string;
}

const EpicSearchCardView = ({ pathname }: PropsType) => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Ticket / {pathname.split("/")[3] ? pathname.split("/")[3] : "Epic"}
        </h1>
      </div>
      {pathname !== "/dashboard/epic/setting" && (
        <div className="mt-6 h-[180px] w-full bg-white rounded-[20px] shadow-md p-4">
          <div className="flex items-center w-full">
            <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
              Epic
            </div>
            <CustomSelect option="Epic" />
            <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
              Type
            </div>
            <CustomSelect option="Type" />
            <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
              Status
            </div>
            <CustomSelect option="Status" />
          </div>
          <div className="flex items-center w-full mt-8">
            <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px]">
              Search
            </div>
            <CustomSearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default EpicSearchCardView;
