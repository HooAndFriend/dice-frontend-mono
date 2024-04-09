"use client";

// ** Next Imports
import Image from "next/image";

// ** Mutation Imports
import useSWRMutation from "swr/mutation";

// ** Service Imports
import { Post } from "@/src/repository";

// ** Type Imports
import { CreateTicketSettingResponse } from "@/src/type/ticket";

const TicketTypeAddItem = () => {
  const addTicketSetting = useSWRMutation(
    "/v1/ticket/setting",
    async (url: string) =>
      await Post<CreateTicketSettingResponse>(url, {
        color: "",
        type: "",
        description: "",
      })
        .then((res) => {
          alert("등록되었습니다");
        })
        .catch((error) => {
          console.log(error);
        })
  );

  const handleAdd = () => {
    addTicketSetting.trigger();
  };

  return (
    <div className="w-full h-[75px] flex items-center">
      <div onClick={handleAdd} className="flex items-center w-full h-full">
        <Image src="/svg/add-box.svg" width={36} height={36} alt="add-box" />
        <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">Add Type</h1>
      </div>
    </div>
  );
};

export default TicketTypeAddItem;
