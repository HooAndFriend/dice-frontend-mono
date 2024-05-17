"use client";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import CustomInput from "@/src/components/Input/CustomInput";
import CustomImage from "../../../Image/CustomImage";
import TicketSettingTypeButton from "../TicketSettingTypeButton";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";
import { mutate } from "swr";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { TicketSettingSaveProps, TicketSettingType } from "@/src/type/ticket";

const TicketSettingAddItem = () => {
  const { data, handleInit, handleInput, setData } =
    useInput<TicketSettingSaveProps>({
      name: "",
      description: "",
      type: "GREEN",
    });

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleModalOpen } = useDialog();

  const saveTicketSetting = useSWRMutation(
    "/v1/ticket/setting",
    async (url: string) => await Post<CommonResponse<void>>(url, data),
    {
      onSuccess: () => {
        setOpen(false);
        handleInit();
        mutate("/v1/ticket/setting");
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  const setType = (type: TicketSettingType) => {
    setData((c) => ({ ...c, type }));
  };

  const handleClose = () => {
    setOpen(false);
    handleInit();
  };

  return (
    <div>
      {open ? (
        <div className="flex w-full h-full cursor-pointer mb-[10px]">
          <div>
            <p className="text-[14px] mb-[18px]">icon</p>
            <TicketSettingTypeButton type={data.type} setType={setType} />
          </div>
          <div className="px-8">
            <p className="text-[14px] mb-[13px]">Type Name</p>
            <CustomInput
              name="name"
              placeholder="Enter Type Name"
              value={data.name}
              onChange={handleInput}
              width="165px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div>
            <p className="text-[14px] mb-[13px]">Description</p>
            <CustomInput
              name="description"
              placeholder="Enter Description"
              value={data.description}
              onChange={handleInput}
              width="600px"
              height="50px"
              borderRadius="10px"
            />
          </div>
          <div className="flex items-center mt-[30px]">
            {data.name === "" ? (
              <button className="w-[94px] h-[50px] rounded-[10px] text-[#D9D9D9] bg-[#EBEBEC] ml-[24px]">
                만들기
              </button>
            ) : (
              <button
                className="w-[94px] h-[50px] rounded-[10px] bg-[#623AD6] text-white ml-[24px]"
                onClick={saveTicketSetting.trigger}
              >
                만들기
              </button>
            )}
            <button
              className="w-[94px] h-[50px] rounded-[10px] ml-[7px]"
              onClick={handleClose}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center w-full h-full cursor-pointer"
          onClick={handleOpen}
        >
          <CustomImage
            src="/svg/add-box.svg"
            width={36}
            height={36}
            alt="add-box"
          />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Type
          </h1>
        </div>
      )}
    </div>
  );
};

export default TicketSettingAddItem;
