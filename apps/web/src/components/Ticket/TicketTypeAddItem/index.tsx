"use client";

// ** React Imports
import {useState} from "react";

// ** Next Imports
import CustomInput from "@/src/components/Input/CustomInput";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import {Post} from "@/src/repository";
import {
  CreateTicketSettingParams,
  CreateTicketSettingResponse,
} from "@/src/type/ticket";
import {useRecoilValue} from "recoil";
import {AuthState} from "@/src/app";
import useInput from "@/src/hooks/useInput";

const TicketTypeAddItem = () => {
  const {accessToken} = useRecoilValue(AuthState);

  const addTicketSetting = useSWRMutation(
    "/v1/ticket/setting",
    async (url: string) =>
      await Post<CreateTicketSettingResponse>(
        url,
        {
          color: "",
          type: "",
          description: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(res => {
          alert("등록되었습니다");
        })
        .catch(error => {
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
