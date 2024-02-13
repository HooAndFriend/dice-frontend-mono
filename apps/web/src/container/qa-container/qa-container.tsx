// ** Component Imports
import CustomSelect from '@/src/components/input/custom-select';
import CreateIssue from './components/create-issue';
import IssueDetail from './components/issue-detail';

interface PropsType {
  openCreateIssue: boolean;
  handleCreateIssueOpen: () => void;
}

const QaContainerView = ({
  openCreateIssue,
  handleCreateIssueOpen,
}: PropsType) => {
  return (
    <div className="w-full bg-[#FAFAFB] ">
      {/* 오른쪽 내용 */}
      <div className="ml-[47px] w-[95%]">
        <div className="font-mosk font-bold text-[32px]">QA</div>
        <div className="w-full h-[100px] shadow-md border-[#EBEBEC] rounded-[20px] bg-white mt-[30px] flex items-center">
          <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px] text-center">
            Title
          </div>
          <CustomSelect />
          <div className="font-spoqa text-base font-bold ml-[50px] mr-[29px] text-center">
            Search
          </div>
          <div className="w-[443px] h-[50px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4">
            <input
              className="h-[45px] placeholder-[#EBEBEC] focus:outline-none"
              placeholder="Search"
            />
            <img src="/svg/searchIcon.svg" width={24} height={24} />
          </div>
        </div>
        <div className="h-[50px] w-full flex justify-between items-center mt-[43px] mb-[30px]">
          <div className="text-lg font-medium text-center font-spoqa">
            Total 4건
          </div>
          <div className="flex items-center">
            <div className="flex items-center h-6 w-[406px] justify-between font-spoqa text-[#EBEBEC]">
              <div className="border-b text-main border-main">ALL</div>
              <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
              <div>WAITING</div>
              <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
              <div>DOING</div>
              <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
              <div>DONE</div>
              <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
              <div>COMPLETE</div>
            </div>
            <div
              onClick={handleCreateIssueOpen}
              className="w-[120px] h-[50px] rounded-[30px] flex items-center bg-white border border-[#EBEBEC] justify-center ml-8"
            >
              <img src="/images/Add_To_Queue.png" width={24} height={24} />
              <div className="font-spoqa font-bold text-center ml-[5px]">
                Add
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[521px] flex justify-between">
          <div className="w-1/2 h-[521px] rounded-[20px] bg-white mr-10 shadow-md border-[#EBEBEC]">
            <div className="h-[125px] m-6">
              <div className="w-full h-[30px] flex mb-[5px]">
                <div className="flex items-center mr-5">ISSLE-01</div>
                <div className="bg-[#F13333] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center font-spoqa text-base text-center">
                  NEW
                </div>
              </div>
              <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                [AOS] 상세보기 버튼 누락
              </div>
              <div className="w-full h-[45px] flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="rounded-full border border-[#EBEBEC] mr-[10px] "
                    src="/images/dice.png"
                    width={30}
                    height={30}
                  />
                  <div className="font-spoqa">김인후</div>
                </div>
                <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                  WAITING
                </button>
              </div>
            </div>
            <div className="h-[1px] bg-[#EBEBEC] mx-6"></div>
            <div className="h-[125px] m-6">
              <div className="w-full h-[30px] flex mb-[5px]">
                <div className="flex items-center mr-5">ISSLE-01</div>
              </div>
              <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                [AOS] 상세보기 버튼 누락
              </div>
              <div className="w-full h-[45px] flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="rounded-full border border-[#EBEBEC] mr-[10px] "
                    src="/images/dice.png"
                    width={30}
                    height={30}
                  />
                  <div className="font-spoqa">김인후</div>
                </div>
                <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                  WAITING
                </button>
              </div>
            </div>
            <div className="h-[1px] bg-[#EBEBEC] mx-6"></div>
            <div className="h-[125px] m-6">
              <div className="w-full h-[30px] flex mb-[5px]">
                <div className="flex items-center mr-5">ISSLE-01</div>
              </div>
              <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                [AOS] 상세보기 버튼 누락
              </div>
              <div className="w-full h-[45px] flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="rounded-full border border-[#EBEBEC] mr-[10px] "
                    src="/images/dice.png"
                    width={30}
                    height={30}
                  />
                  <div className="font-spoqa">김인후</div>
                </div>
                <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                  WAITING
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-[564px] rounded-[20px] bg-white shadow-md border-[#EBEBEC] p-6 overflow-auto">
            {openCreateIssue && <CreateIssue />}
            {/* <IssueDetail /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QaContainerView;
