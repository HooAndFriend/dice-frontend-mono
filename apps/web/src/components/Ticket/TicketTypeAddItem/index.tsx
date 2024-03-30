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
        <div className="flex h-[60px] items-center">
          <div className="flex items-center justify-center">
            <input
              name="color"
              onChange={handleInput}
              type="color"
              className="w-[40px] h-[40px] bg-green-300 rounded-lg"
            />
          </div>
          <div className="px-8">
            <CustomInput
              name="type"
              onChange={handleInput}
              width="165px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div>
            <CustomInput
              name="description"
              onChange={handleInput}
              width="1000px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div onClick={handleAdd} className="ml-4">
            <Image
              onClick={handleOpen}
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
        </div>
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
