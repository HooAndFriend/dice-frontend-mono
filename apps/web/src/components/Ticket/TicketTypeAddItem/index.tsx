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
import {useRecoilState, useRecoilValue} from "recoil";
import {AuthState, WorkspaceState} from "@/src/app";
import useInput from "@/src/hooks/useInput";

const TicketTypeAddItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {accessToken} = useRecoilValue(AuthState);

  const {data, handleInput} = useInput<CreateTicketSettingParams>({
    color: "",
    type: "",
    description: "",
  });

  const handleOpen = () => {
    setOpen(c => !c);
  };

  const addTicketSetting = useSWRMutation(
    "/v1/ticket/setting",
    async (url: string) =>
      await Post<CreateTicketSettingResponse>(
        url,
        {...data},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        alert("등록이 완료되었습니다");
      },
      onError: error => {
        console.log(error + "등록실패");
      },
    }
  );

  const handleAdd = () => {
    addTicketSetting.trigger();
  };

  return (
    <div className="w-full h-[75px] flex items-center">
      {open ? (
        <>
          <input
            name="color"
            type="color"
            onChange={handleInput}
            className="mr-8 w-[24px] h-[24px] bg-green-300 rounded-lg"
          />
          <CustomInput
            name="type"
            onChange={handleInput}
            placeholder="Enter Type Name"
          />
          <div onClick={handleAdd} className="ml-4">
            <Image
              onClick={handleOpen}
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
        </>
      ) : (
        <div onClick={handleOpen} className="flex items-center w-full h-full">
          <Image src="/svg/add-box.svg" width={36} height={36} alt="add-box" />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Type
          </h1>
        </div>
      )}
    </div>
  );
};

export default TicketTypeAddItem;
