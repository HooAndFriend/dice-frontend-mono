// ** Component Imports
import CustomSelect from "@/src/components/Input/custom-select";
import CreateIssue from "./components/create-issue";
import IssueDetail from "./components/issue-detail";
import CustomSearch from "@/src/components/Input/custom-search";
import StatusItem from "./components/StatusItem";
import EpicItem from "./components/EpicItem";

// ** Type Imports
import { IssueInfo, QaQuery } from "@/src/type/qa";
import { EpicStatus } from "@/src/type/epic";

interface PropsType {
  open: boolean;
  qaId: number;
  data: IssueInfo[];
  status: EpicStatus;
  query: QaQuery;
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenQa: (id: number) => void;
  setStatus: (status: EpicStatus) => void;
}

const SelectItem = [
  { value: "title", label: "Title" },
  { value: "qaId", label: "Qa Id" },
  { value: "adminNickname", label: "Admin" },
  { value: "workerNickname", label: "Worker" },
];

const QaContainerView = ({
  data,
  qaId,
  status,
  open,
  query,
  setStatus,
  handleOpenQa,
  handleSelect,
  handleInput,
}: PropsType) => {
  return (
    <div className="w-full bg-[#FAFAFB] p-5">
      {/* 오른쪽 내용 */}
      <div className="font-mosk font-bold text-[32px]">QA</div>
      <div className="w-full h-[100px] shadow-md border-[#EBEBEC] rounded-[20px] bg-white mt-[30px] flex items-center">
        <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px] text-center">
          Title
        </div>
        <CustomSelect
          option="title"
          item={SelectItem}
          value={query.type}
          setValue={handleSelect}
        />
        <div className="font-spoqa text-base font-bold ml-[50px] mr-[29px] text-center">
          Search
        </div>
        <CustomSearch value={query.value} onChange={handleInput} />
      </div>
      <div className="flex justify-between w-full">
        <div className={`${open ? "w-1/2" : "w-full"} pr-5`}>
          <div className="h-[50px] w-full flex justify-between items-center mt-[43px] mb-[30px]">
            <div className="text-lg font-medium text-center font-spoqa">
              Total 4건
            </div>
            <div className="flex items-center">
              <div className="flex items-center h-6 w-[406px] justify-between font-spoqa text-[#EBEBEC]">
                <StatusItem status={status} setStatus={setStatus} value="ALL" />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="WAITING"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="DOING"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="DONE"
                />
                <div className="h-[15px] w-px bg-[#EBEBEC]" />
                <StatusItem
                  status={status}
                  setStatus={setStatus}
                  value="COMPLETE"
                />
              </div>
              <div
                // onClick={handleCreateIssueOpen}
                className="w-[120px] h-[50px] rounded-[30px] flex items-center bg-white border border-[#EBEBEC] justify-center ml-8"
              >
                <img src="/images/Add_To_Queue.png" width={24} height={24} />
                <div className="font-spoqa font-bold text-center ml-[5px]">
                  Add
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-5 h-[564px] rounded-[20px] bg-white mr-10 shadow-md border-[#EBEBEC] overflow-auto">
            {data.map((item) => (
              <EpicItem item={item} key={item.id} handleOpenQa={handleOpenQa} />
            ))}
          </div>
        </div>
        {open && (
          <div className="w-1/2 mt-[123px] h-[564px] rounded-[20px] bg-white shadow-md border-[#EBEBEC] p-5 overflow-y-auto">
            <IssueDetail qaId={qaId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QaContainerView;
