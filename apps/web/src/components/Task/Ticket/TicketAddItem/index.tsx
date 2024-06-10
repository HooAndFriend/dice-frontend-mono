"use client";

// ** React Imports
import { KeyboardEvent, useState } from "react";

// ** Component Imports
import CustomInput from "@/src/components/Input/CustomInput";
import CustomImage from "../../../Image/CustomImage";
import TicketSelectSettingButton from "../TicketSelectSettingButton";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";
import { mutate } from "swr";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

interface PropsType {
  epicId?: number;
}

const TicketAddItem = ({ epicId }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [button, setButton] = useState<boolean>(false);

  const [selectTypeId, setSelectTypeId] = useState<number>(0);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleModalOpen } = useDialog();

  const saveTicket = useSWRMutation(
    "/v1/ticket",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, {
        name,
        settingId: selectTypeId,
      }),
    {
      onSuccess: () => {
        setButton(false);
        setOpen(false);
        setName("");
        mutate("/v1/ticket");
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
        setButton(false);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
    setName("");
    setButton(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (button) return;
      setButton(true);
      saveTicket.trigger();
    }

    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div className="w-[90%] h-[75px] flex items-center ml-[48px]">
      {open ? (
        <>
          <TicketSelectSettingButton
            selectTypeId={selectTypeId}
            setSelectTypeId={setSelectTypeId}
          />
          <CustomInput
            placeholder="Enter Ticket Name"
            borderRadius="8px"
            height="40px"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleEnter}
          />
          <div className="ml-4" onClick={saveTicket.trigger}>
            <CustomImage
              onClick={handleOpen}
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
          <div className="ml-4 cursor-pointer" onClick={handleClose}>
            <h1 className="font-bold text-[24px]">X</h1>
          </div>
        </>
      ) : (
        <div onClick={handleOpen} className="flex items-center w-full h-full">
          <CustomImage
            src="/svg/add-box.svg"
            width={36}
            height={36}
            alt="add-box"
          />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Ticket
          </h1>
        </div>
      )}
    </div>
  );
};

export default TicketAddItem;
