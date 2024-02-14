import CustomSelect from "@/src/components/input/custom-select";
import {IssueInfo} from "@/src/type/qa";

interface PropsType {
  data: IssueInfo;
}

const IssueDetailView = ({data}: PropsType) => {
  return (
    <>
      <div className="h-[40px] flex items-center justify-between">
        <div className="font-spoqa font-medium text-lg">{data.number}</div>
        <div className="flex font-spoqa font-bold">
          <div className="w-[110px] h-[40px] rounded-[30px] border border-lightGray flex justify-center items-center mr-[10px]">
            <img
              className="mr-[5px]"
              src="/svg/note_edit.svg"
              width={24}
              height={24}
            />
            <div className="">Edit</div>
          </div>
          <button className="w-[110px] h-[40px] rounded-[30px] bg-black text-white flex justify-center items-center">
            <img
              className="mr-[5px]"
              src="/images/Trash_Full.png"
              width={24}
              height={24}
            />
            <div className="flex items-center">Delete</div>
          </button>
        </div>
      </div>
      <div className="h-[50px] flex justify-between mt-[30px] font-spoqa">
        <div className="text-xl font-bold flex items-center">{data.title} </div>
        <CustomSelect option={data.status} />
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-5 mt-5 flex">
        <div className="font-spoqa mr-[79px] font-medium">Admin</div>
        <div className="flex mr-[45px]">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src={data.admin.profile}
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">
            {data.admin.nickname}
          </div>
        </div>
        <div className="font-spoqa mr-[80px] font-medium">Worker</div>
        <div className="flex">
          <img
            className="rounded-full border border-[#EBEBEC] mr-[10px]"
            src={data.admin.profile}
            width={20}
            height={20}
          />
          <div className="flex items-center font-normal">
            {data.admin.nickname}
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="h-[20px] flex mt-5 ">
        <div className="font-spoqa font-medium mr-[65px]">RegDate</div>
        <div className="font-spoqa font-normal mr-[30px] text-darkGray tracking-[1px]">
          {data.modifiedDate.substring(0, 10)}
        </div>
        <div className="font-spoqa font-medium mr-[58px]">modDate</div>
        <div className="font-spoqa font-normal text-darkGray tracking-[1px]">
          {data.modifiedDate.substring(0, 10)}
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="mt-5 mb-[14px]">As-Is</div>
      <input
        id="asIs"
        value={data.asIs}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">To-Be</div>
      <input
        id="toBe"
        value={data.toBe}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">Memo</div>
      <input
        id="memo"
        value={data.memo}
        className="border border-[#EBEBEC] h-[80px] w-full rounded-[10px]"
      />
      <div className="mt-5 mb-[14px]">
        FILE <span className="font-spoqa text-darkGray text-sm">(MAX:4)</span>
      </div>
      {data.file ? (
        data.file.map(item => {
          <img
            src={item.url}
            className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"
          />;
        })
      ) : (
        <div className="w-[40px] h-[40px] rounded-[6px] bg-[#D9E0FF]"></div>
      )}

      <div className="h-[1px] bg-[#EBEBEC] mt-[20px]"></div>
      <div className="flex mt-5">
        <input className="w-full border border-lightGray rounded-[10px] mr-[10px]" />
        <div className="w-[40px] h-[40px] bg-black text-white rounded-[10px] flex justify-center items-center">
          <img src="/images/plus.png" width={24} height={24} />
        </div>
      </div>
      <div className="mt-9">
        <div className="w-full h-[59px] mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="rounded-full border border-lightGray mr-[10px]"
                src="/images/profile.jpg"
                width={30}
                height={30}
              />
              <div className="flex font-spoqa">
                <div className="mr-[10px]">김인후</div>
                <div className="text-darkGray text-xs flex items-center">
                  2023-11-20 16:20:13
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <img src="/svg/note_edit.svg" />
              <div className="h-4 w-px bg-lightGray mx-[5px]"></div>
              <img src="/svg/trashcanIcon.svg" width={24} height={24} />
            </div>
          </div>
          <div className="ml-[41px] mt-[9px]">댓글입니다.</div>
        </div>
        <div className="w-full h-[59px] mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="rounded-full border border-lightGray mr-[10px]"
                src="/images/profile.jpg"
                width={30}
                height={30}
              />
              <div className="flex font-spoqa">
                <div className="mr-[10px]">김인후</div>
                <div className="text-darkGray text-xs flex items-center">
                  2023-11-20 16:20:13
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <img src="/svg/note_edit.svg" />
              <div className="h-4 w-px bg-lightGray mx-[5px]"></div>
              <img src="/svg/trashcanIcon.svg" width={24} height={24} />
            </div>
          </div>
          <div className="ml-[41px] mt-[9px]">댓글입니다.</div>
        </div>
      </div>
    </>
  );
};

export default IssueDetailView;
