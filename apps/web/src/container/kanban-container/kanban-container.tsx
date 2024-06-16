"use client";
// ** Component Imports
import CustomSearch from "@/src/components/Input/CustomSearch";
import TicketStatusSelectFilter from "@/src/components/Task/Common/Filter/StatusFilter";
import TicketTypeSelectFilter from "@/src/components/Task/Common/Filter/TypeFilter";
import TicketSettingButton from "@/src/components/Task/Ticket/TicketSettingButton";
import TicketStatusButton from "@/src/components/Task/Ticket/TicketStatusButton";
import TicketUserButton from "@/src/components/Task/Ticket/TicketUserButton";
import UserSelectBox from "@/src/components/UserSelectBox";
import { statusList } from "@/src/constants/status";

// ** Type Imports
import { Ticket } from "@/src/type/ticket";

interface PropsType {
  data: Ticket[];
}

const KanbanContainerView = ({ data }: PropsType) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between pt-8 h-[8%]">
        <div className="flex items-center">
          <CustomSearch width="200px" value={""} onChange={() => {}} />
          <TicketStatusSelectFilter
            selectedStatus={[]}
            handleEpicSelectFilter={() => {}}
          />
          <TicketTypeSelectFilter
            selectedTypeIds={[]}
            handleTypeSelectFilter={() => {}}
          />
          <UserSelectBox checkedList={[]} setCheckedList={() => {}} />
        </div>
        <div className="flex items-center">
          <h1 className="text-[18px] font-san-medium">Total Ticket : {0}</h1>
        </div>
      </div>
      <div className="h-[92%] py-[24px]">
        <div className="flex w-full h-full bg-white border rounded-lg scrollbar-thumb-slate-700 scrollbar-track-slate-300 px-[2%] py-[24px]">
          <div className="flex flex-wrap w-full">
            {statusList.map((item) => (
              <div className="flex-1 h-full px-[12px]">
                <div className="w-full h-full bg-[#F1F2F5] px-[12px] py-[12px]">
                  <h1>{item}</h1>
                  {data
                    .filter((_) => _.status === item)
                    .map((_) => (
                      <div className="mt-[12px] w-full h-[140px] border-2 p-[8px] border-[#E1E3E8] bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center">
                            <TicketSettingButton data={_} isText={false} />
                            <p className="pl-[8px]">{_.code}</p>
                          </div>
                          <div className="pt-[12px]">
                            <h1>{_.name}</h1>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <TicketStatusButton
                            ticketId={_.ticketId}
                            status={_.status}
                          />
                          <TicketUserButton
                            profile={
                              _.worker ? _.worker.profile : "/images/dice.png"
                            }
                            nickname={_.worker ? _.worker.nickname : "-"}
                            email={_.worker ? _.worker.email : "-"}
                            userId={_.worker?.userId}
                            type="user"
                            ticketId={_.ticketId}
                            isNickname={false}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanContainerView;
